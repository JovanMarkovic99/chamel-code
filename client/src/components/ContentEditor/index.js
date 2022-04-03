import React from 'react';
import styled from 'styled-components';
import bold from '../../images/bold.svg';
import italic from '../../images/italic.svg';
import link from '../../images/link.svg';
import quote_right from '../../images/quote_right.svg';
import code from '../../images/code.svg';
import heading from '../../images/heading.svg';
import horizontal_line from '../../images/triple_horizontally_aligned_lines.svg';


const IconSection = styled.div`
    height: 100%;
    margin: auto auto;

    &:first-child {
        margin-left: 5px;
    }

    &:last-child {
        margin-right: 5px;
    }

    & > img {
        height: 43px;
        padding: 14px 5px;
        transition: background-color 0.2s ease;

        &:hover {
            cursor: pointer;
            background-color: rgba(232, 232, 232, 0.7);
            background-color: var(--real-faded-gray);
        }

        @media screen and (min-width: 300px) {
            padding: 14px 10px;
        }
    }
`;

export const ContentEditorElement = ({ className, passedValue, handleChange, errorCheck }) => {

    function getInputSelection(el) {
        var start = 0, end = 0, normalizedValue, range, textInputRange, len, endRange;
    
        if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
            start = el.selectionStart;
            end = el.selectionEnd;
        } else {
            range = document.selection.createRange();
    
            if (range && range.parentElement() === el) {
                len = el.value.length;
                normalizedValue = el.value.replace(/\r\n/g, "\n");
    
                // Create a working TextRange that lives only in the input
                textInputRange = el.createTextRange();
                textInputRange.moveToBookmark(range.getBookmark());
    
                // Check if the start and end of the selection are at the very end
                // of the input, since moveStart/moveEnd doesn't return what we want
                // in those cases
                endRange = el.createTextRange();
                endRange.collapse(false);
    
                if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                    start = end = len;
                } else {
                    start = -textInputRange.moveStart("character", -len);
                    start += normalizedValue.slice(0, start).split("\n").length - 1;
    
                    if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                        end = len;
                    } else {
                        end = -textInputRange.moveEnd("character", -len);
                        end += normalizedValue.slice(0, end).split("\n").length - 1;
                    }
                }
            }
        }
    
        return {
            start: start,
            end: end
        };
    };

    const addText = (pre_su_fix, dummy_text) => {
        let element = document.getElementById("editor");
        let element_content = element.value;

        element.focus();
        var result = getInputSelection(element);
        let selection_set = {
            start: result.start + 2 + pre_su_fix.length,
            end: 0,
        };

        if (result.start === result.end) {
            // Insert prefix, sufix and dummy text
            element.value = element_content.substring(0, result.start) + 
                " " + pre_su_fix + " " + dummy_text + " " + pre_su_fix + " " +
                element_content.substr(result.start);
            selection_set.end = selection_set.start + dummy_text.length;

        } else {
            // Insert prefix and sufix around selection
            element.value = element_content.substring(0, result.start) +
                " " + pre_su_fix + " " + element_content.substring(result.start, result.end) +
                " " + pre_su_fix + " " + element_content.substr(result.end);
            selection_set.end = selection_set.start + result.end - result.start;
        }

        // Refocus text
        element.selectionStart = selection_set.start;
        element.selectionEnd = selection_set.end; 

        handleChange(element.value);
    };

    const addLink = () => {
        let element = document.getElementById("editor");
        let element_content = element.value;

        element.focus();
        var result = getInputSelection(element);
        let selection_set = {
            start: result.start + 3,
            end: result.start + 14,
        };

        if (result.start === result.end) {
            element.value = element_content.substring(0, result.start) + 
                " [[description]]:[[https://]] " + element_content.substr(result.end);
        } else {
            element.value = element_content.substring(0, result.start) + 
                " [[" + element_content.substring(result.start, result.end) +
                "]]:[[https://]] " + element_content.substr(result.end);
                selection_set.end = selection_set.start + result.end - result.start;
        }

        element.selectionStart = selection_set.start;
        element.selectionEnd = selection_set.end; 

        handleChange(element.value);
    };

    const addHR = () => {
        let element = document.getElementById("editor");
        let element_content = element.value;

        element.focus();
        var result = getInputSelection(element);
        let selection_set = {
            start: result.end + 5,
            end: result.end + 5,
        };

        element.value = element_content.substring(0, result.end) + "\n---\n" + element_content.substr(result.end);
        element.selectionStart = selection_set.start;
        element.selectionEnd = selection_set.end; 

        handleChange(element.value);
    };

    return (
        <div className={className}>
            <div>
                <IconSection>
                    <img src={bold} onClick={() => addText("***", "Strong text")} title={"Strong/bold <strong>"} alt="" />
                    <img src={italic} onClick={() => addText("**", "Emphasized text")} title={"Emphasis/italic <em>"} alt="" />
                </IconSection>
                <IconSection>
                    <img src={link} onClick={() => addLink()} title={"Hyperlink <a>"} alt="" />
                    <img src={quote_right} onClick={() => addText("''", "Blockquote")} title={"Blockquote <blockquote>"} alt=""/>
                    <img src={code} onClick={() => addText("``", "code")} title={"Code sample <code>"} alt="" />
                </IconSection>
                <IconSection>
                    <img src={heading} onClick={() => addText("##", "Heading")} title={"Heading <h1>/<h2>"} alt="" />
                    <img src={horizontal_line} onClick={() => addHR()} title={"Horizontal rule <hr>"} alt="" />
                </IconSection>
            </div>
            <textarea id="editor" cols="92" rows="15" spellCheck="false" value={passedValue} onChange={e => handleChange(e.target.value)} 
            style= {{
                border: errorCheck ? "solid 1px var(--error-dark)" : "",
                background: errorCheck ? "var(--error-light)" : ""
            }}/>
        </div>
    )
}

const ContentEditor = styled(ContentEditorElement)`
    width: 100%;
    display: flex;
    flex-direction: column;

    & > div {
        display: flex;
        height: 45px;
        background-color: #FAFAFA;
        background-color: var(--bg-white);
        border-radius: 4px 4px 0 0;
        border: 1px solid rgba(112, 112, 112, 0.5);
        border: 1px solid var(--nav-border);
    }

    & > textarea {
        height: 180px;
        padding: 7px;
        background-color: #FAFAFA;
        background-color: var(--bg-white);
        border-radius: 0 0 4px 4px;
        border: 1px solid rgba(112, 112, 112, 0.5);
        border: 1px solid var(--nav-border);
        font-size: 15px;
        color: rgba(0, 0, 0, 0.87);
        color: var(--text-black);
        overflow-y: scroll;
    }

    @media screen and (min-width: 650px) {
        & > div {
            padding-right: 20%;
        }

        & > textarea {
            height: 198px;
            font-size: 16.5px;
        }
    }

    @media screen and (min-width: 1080px) {
        & > div {
            padding-right: 40%;
        }
    }

    @media screen and (min-width: 1200px) {
        & > div {
            padding-right: 60%;
        }
    }
`;

export default ContentEditor;