import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const ContentRendererElement = ({ className, passValue, noLinks }) => {
    const [content, setContent] = useState(null);

    let getNewElement = (elem_tag, between) => {
        switch(elem_tag) {
            case " *** ":
                return React.createElement("strong", {}, ...between);
            case " ** ":
                return React.createElement("em", {}, ...between);
            case " '' ":
                return React.createElement("blockquote", {}, ...between);
            case " `` ":
                return React.createElement("pre", {}, React.createElement("code", {}, ...between));
            default:
                return React.createElement("h2", {}, ...between);   
        }
    };

    useEffect(() => {
        let operands = ["]]:[[", "[[", "]]", " *** ", " ** ", " '' ", " `` ", " ## ", "\n---\n", "<br>"];
        let content_search = passValue.split(/( \*\*\* )|( \*\* )|(\]\]:\[\[)|(\[\[)|(\]\])|( '' )|( `` )|( ## )|(\n---\n)|(<br>)/)
                            .filter((el) => { return el !== undefined && el !== ""; });
        let stack = [];
        let content_base = [];

        content_search.map((elem, index) => {
            // Elem is an operator
            if (operands.indexOf(elem) !== -1) {
                
                // Elem is an exclusive opening/middle tag
                if (elem === "[[" || elem === "]]:[[" ) {
                    stack.push(elem);
                
                } else if (elem === "\n---\n" || elem === "<br>") {
                    let new_elem;

                    if (elem === "\n---\n") {
                        new_elem = React.createElement("hr", {}, null);
                    } else {
                        new_elem = React.createElement("br", {}, null);
                    }

                    if (stack.length) {
                        stack.push(new_elem);
                    } else {
                        content_base.push(new_elem);
                    }
                
                // Elem is an exclusive closing tag
                } else if (elem === "]]") {
                    let mid = stack.lastIndexOf("]]:[[");
                    let op = stack.lastIndexOf("[[", mid);

                    if (op === -1 || mid === -1) {
                        stack.push(elem);
                    } else {
                        let link = stack.slice(mid + 1, stack.length).join();
                        let desc = stack.slice(op + 1, mid);

                        if (!op) {
                            stack = [];
                        } else {
                            stack = stack.slice(0, op);
                        }

                        let new_elem;
                        if (noLinks) {
                            new_elem = React.createElement("p", {}, ...desc);   
                        } else {
                            new_elem = React.createElement("a", {href: link}, ...desc);
                        }

                        
                        if (stack.length) {
                            stack.push(new_elem);
                        } else {
                            content_base.push(new_elem);
                        }
                    }

                // Elem is a opening/closing tag
                } else {
                    let op = stack.lastIndexOf(elem);

                    // Operator not in stack => it's an opening operator
                    if (op === -1) {
                        stack.push(elem);
                    } else {
                        let between = stack.slice(op + 1, stack.length);

                        if (!op) {
                            stack = [];
                        } else {
                            stack = stack.slice(0, op);
                        }

                        let new_elem = getNewElement(elem, between);

                        if (stack.length) {
                            stack.push(new_elem);
                        } else {
                            content_base.push(new_elem);
                        }
                    }
                }
            
            // Elem is text
            } else if (stack.length) {
                stack.push(elem);
            } else {
                content_base.push(elem);
            }

            return true;
        });


        setContent(React.createElement("div", {}, ...content_base));
    }, [passValue, noLinks]);

    return (
        <div className={className} >
            { content && (
                content
            )}
        </div>
    )
}

const ContentRenderer = styled(ContentRendererElement)`
    width: 100%;
    padding: 8px;
    overflow: hidden;

    & > div {
        width: 100%;
        word-wrap: break-word;
        overflow-wrap: break-word;
        font-size: 14px;
        font-weight: 400;

        h2 {
            font-size: 18px;
            font-weight: 600;
        }

        strong {
            font-weight: 600;
        }

        p {
            color: blue;
            text-decoration: underline;
        }

        pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }

        code {
            display: block;
            height: auto;
            padding: 12px;
            background-color: #3ba55c;
            background-color: var(--text-tertiary);
            border-radius: 5px;
            margin: 15px 0;
        }

        hr {
            height: 1px;
            background-color: rgba(255, 255, 255, 0.7);
            background-color: var(--text-white-light);
            margin-bottom: 10px;
        }
    }
`

export default ContentRenderer;