import React, { useState, useEffect, useRef } from "react";
import "./Editor.scss";
import initSqlJs from "sql.js";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";

const Editor = ({ script, type, consoleComponents, setConsoleComponents, handleExercise }) => {
    const [db, setDb] = useState(null);

    const runScriptDatabase = async (script) => {
        try {
            await db.run(script);
        } catch (err) {
            // console.log("Error runScriptDatabase: " + err);
        }
    }

    runScriptDatabase(script);

    useEffect(() => {
        const createDatabase = async () => {
            try {
                const SQL = await initSqlJs({ locateFile: (file) => `https://sql.js.org/dist/${file}` });
                setDb(new SQL.Database());
            } catch (err) {
                setError(err);
            }
        }

        createDatabase();
    }, []);

    return <SQLRepl db={db} type={type} consoleComponents={consoleComponents} setConsoleComponents={setConsoleComponents} handleExercise={handleExercise} />;
}

const SQLRepl = ({ db, type, consoleComponents, setConsoleComponents, handleExercise }) => {
    const [enableEditor, setEnableEditor] = useState(false);
    const [sql, setSql] = useState('');
    const [results, setResults] = useState([]);
    const bottomRef = useRef(null);

    function exec(sql) {
        let arr = consoleComponents;
        let commands = ['create', 'drop', 'alter', 'truncate', 'insert', 'delete']
        let contains = false
        let command_string = ''
        
        commands.forEach(command => {
            if (sql.toLowerCase().includes(command)) {
                contains = true;
                if (command_string.length == 0) {
                    command_string = command
                }
            }
        });

        if (contains) {
            let error_msg = <p key={arr.length} className="console-fail">Erro: comando não permitido - "{command_string}"</p>
    
            arr.push(error_msg);
            setResults(error_msg);
            handleExercise(error_msg);
        } else {
            try {
                let res = db.exec(sql);
                
                res.map(({ columns, values }) => (
                    arr.push(<ResultsTable key={arr.length} columns={columns} values={values} />)
                ))
    
                setResults(res);
                handleExercise(res);
    
            } catch (err) {
                let error_msg = <p key={arr.length}>Erro: {err.message}</p>
    
                arr.push(error_msg);
                setResults(error_msg);
                handleExercise(error_msg);
            }
        }

    }
    
    useEffect(() => {
        bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [results]);

    return (
        <div className="editor">
            <div className="console-result">
                {consoleComponents.map(component => (
                    component
                ))}
                <div style={{height: 0}} ref={bottomRef}></div>
            </div>

            <AceEditor
                mode="mysql"
                theme="textmate"
                width="520px"
                height="280px"
                fontSize={14}
                highlightActiveLine={false}
                orientation="below"
                editorProps={{ $blockScrolling: true }}
                readOnly={enableEditor}
                className="editor-sql"
                onChange={(e) => { setSql(e) }}
            />
            <button className="btn-executar" onClick={() => type === 'exercise' ? exec(sql) : null} disabled={type !== 'exercise'} >Executar</button>
        </div>
    );
}

const ResultsTable = ({ columns, values }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((columnName, i) => (
                        <td key={i}>{columnName}</td>
                    ))}
                </tr>
            </thead>

            <tbody>
                {
                    values.map((row, i) => (
                        <tr key={i}>
                            {row.map((value, i) => (
                                <td key={i}>{value}</td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default Editor