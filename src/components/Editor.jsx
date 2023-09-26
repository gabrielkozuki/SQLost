import React, { useState, useEffect, useRef } from "react";
import "./Editor.scss";
import initSqlJs from "sql.js";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";

export default function Editor({ script }) {
    const [db, setDb] = useState(null);
    const [error, setError] = useState(null);

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

    if (error) return <pre>{error.toString()}</pre>;
    else return <SQLRepl db={db} />;
}

/**
 * A simple SQL read-eval-print-loop
 * @param {{db: import("sql.js").Database}} props
 */
function SQLRepl({ db }) {
    const [enableEditor, setEnableEditor] = useState(false);
    const [sql, setSql] = useState('');
    const [results, setResults] = useState([]);
    const [consoleComponents, setConsoleComponents] = useState([]);
    const bottomRef = useRef(null);

    async function exec(sql) {
        try {
            let res = db.exec(sql);
            
            let arr = consoleComponents;
            res.map(({ columns, values }) => (
                arr.push(<ResultsTable key={arr.length} columns={columns} values={values} />)
            ))

            setConsoleComponents(arr)
            setResults(res)

        } catch (err) {
            let arr = consoleComponents;
            arr.push(<p key={arr.length}>Erro: {err.message}</p>)

            setConsoleComponents(arr)
            setResults([]);
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
            <button className="btn-executar" onClick={() => exec(sql)}>Executar</button>
        </div>
    );
}

/**
 * Renders a single value of the array returned by db.exec(...) as a table
 * @param {import("sql.js").QueryExecResult} props
 */

function ResultsTable({ columns, values }) {
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
