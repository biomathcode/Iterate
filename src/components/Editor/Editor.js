import React, { useState } from 'react';
import Editor from 'rich-markdown-editor';
import {debounce} from 'lodash-es';
import removeMd from 'remove-markdown';
import _ from 'lodash-es';
import Layout from '../Layout/Layout';

import {Box} from 'grommet';

import './editor.css';

const savedText = localStorage.getItem('saved');
const exampleText = ``
const defaultValue = savedText || exampleText;


const FunctionMarkdownEditor = (props) => {
  const [word, setWord] = useState("" || defaultValue)
  const [cleanWord, setCleanWord] = useState("");
  const [readOnly, setreadonly] = useState(false)
  const [template, setTemplate] = useState(false)
  const [dark, setDark] = useState(localStorage.getItem('dark') === "enabled")
  const [value, setValue]= useState(undefined);

  const handleToggleReadOnly = () => {
    setreadonly(!readOnly);
  }
  const handleToggleTemplate = ()  => {
    setTemplate(!template);
  }
  const handleToggleDark = () => {
    setDark(!dark)
    localStorage.setItem("dark", dark ? "enabled" : "disabled");
  }
  const fullscreeentoggle = () => {
    if(!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      if( document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  const handleUpdateValue = () => {
    const existing = localStorage.getItem("saved") || "";
    const value = `${existing}\n\nedit!`;
    localStorage.setItem("saved", value);
    setValue(value)
};
  const handleChange = debounce(value => {
    const text = value();
    console.log(text);
    setWord(text);
    localStorage.setItem("saved", text);
  }, 250);

  const removingMarkdown= ()=>{
    let data = removeMd(word, {
            stripListLeaders: true , 
            listUnicodeChar: '',     
            gfm: true,                
            useImgAltText: true 
    }).toLowerCase();
    data = data.replace(/(\r\n|\n|\r)/gm,"")
    setCleanWord(data);
    console.log(cleanWord)
    const rightwords = _.words(cleanWord || data, /\b[-?(\w+)?]+\b/gi)
    // const keywords = _.difference(rightwords,stopWords )
    // const keywordsCount = _.countBy(keywords);
    console.log(data, rightwords)
    // console.log(keywords)
    // console.log(keywordsCount)
  }

  const { body } = document;

  if (body) body.style.backgroundColor = dark ? "#181A1B" : "#FFF";
  return(
    <div>
            <div>
                <button type="button" onClick={handleToggleReadOnly}>
                    {readOnly ?"Editable" : "Read-only"}
                </button>
                <button type="button" onClick={handleToggleDark}>
            {dark ? "Switch to Light" : "Switch to Dark"}
          </button>{" "}
          <button type="button" onClick={handleToggleTemplate}>
            {template ? "Switch to Document" : "Switch to Template"}
          </button>{" "}
          <button type="button" onClick={handleUpdateValue}>
            Update value
          </button>
          <button type="button" onClick={fullscreeentoggle}>
            FullScreen
          </button>
          <button type="button" onClick={removingMarkdown}>
            RemoveMarkdown
          </button>
          <br/>
            </div>
            <Editor
          id="example"
          readOnly={readOnly}
          readOnlyWriteCheckboxes
          className="editorContainer"
          value={value}
          template={template}
          defaultValue={defaultValue}
          scrollTo={window.location.hash}
          handleDOMEvents={{
            focus: () => console.log("FOCUS"),
            blur: () => console.log("BLUR"),
            paste: () => console.log("PASTE"),
            touchstart: () => console.log("TOUCH START"),
          }}
          onSave={options => console.log("Save triggered", options)}
          onCancel={() => console.log("Cancel triggered")}
          onChange={handleChange}
          onClickLink={(href, event) =>
            console.log("Clicked link: ", href, event)
          }
          onHoverLink={event => {
            console.log("Hovered link: ", event.target.href);
            return false;
          }}
          onClickHashtag={(tag, event) =>
            console.log("Clicked hashtag: ", tag, event)
          }
        //   onSearchLink={async term => {
        //     console.log("Searched link: ", term);

        //     // Delay to simulate time taken for remote API request to complete
        //     return new Promise(resolve => {
        //       setTimeout(() => {
        //         resolve(
        //           docSearchResults.filter(result =>
        //             result.title.toLowerCase().includes(term.toLowerCase())
        //           )
        //         );
        //       }, Math.random() * 500);
        //     });
        //   }}
          dark={dark}
          autoFocus
        />
    </div>
  )
}

const MarkdownEditor = () => {
    return(
        <Layout>
            <Box direction="row-responsive" justify="center">
                <FunctionMarkdownEditor width="small"/>
            </Box>
            
        </Layout>
    )

}


export default MarkdownEditor;