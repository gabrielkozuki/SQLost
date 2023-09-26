import React, { useState, useEffect } from "react";
import "./Editor.scss";
import initSqlJs from "sql.js";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";

export default function Editor() {
    const [db, setDb] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const createSQL = async () => {
            try {
                const SQL = await initSqlJs({ locateFile: (file) => `https://sql.js.org/dist/${file}` });
                setDb(new SQL.Database());
            } catch (err) {
                setError(err);
            }
        }

        createSQL();
    }, []);

    let script = `
        CREATE TABLE users(id int, nome varchar(25));
        INSERT INTO users VALUES (0, 'Gabriel');
        INSERT INTO users VALUES (1, 'Alice');
        INSERT INTO users VALUES (2, 'Júlio');
        INSERT INTO users VALUES (3, 'Felipe');
        INSERT INTO users VALUES (4, 'Sarah');
        INSERT INTO users VALUES (5, 'Sophia');
    `;
    if (db) {
        db.run(script);
    }

    if (error) return <pre>{error.toString()}</pre>;
    else return <SQLRepl db={db} />;
}

/**
 * A simple SQL read-eval-print-loop
 * @param {{db: import("sql.js").Database}} props
 */
function SQLRepl({ db }) {
    const [error, setError] = useState(null);
    const [enableEditor, setEnableEditor] = useState(false);
    const [sql, setSql] = useState('');
    const [results, setResults] = useState([]);

    function exec(sql) {
        try {
            setResults(db.exec(sql));
            setError(null);
        } catch (err) {
            setError(err);
            setResults([]);
        }
    }

    return (
        <div className="editor">
            <pre className="error">{(error || "").toString()}</pre>
            <pre>
                {
                    results.map(({ columns, values }, i) => (
                        <ResultsTable key={i} columns={columns} values={values} />
                    ))
                }
            </pre>

            <AceEditor
                mode="mysql"
                theme="textmate"
                width="480px"
                height="280px"
                fontSize={16}
                highlightActiveLine={false}
                orientation="below"
                editorProps={{ $blockScrolling: true }}
                readOnly={enableEditor}
                className="editor-sql"
                onChange={(e) => { setSql(e) }}
                onInput={(e) => { e.key == 'Enter' ? exec(sql) : null }}
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
