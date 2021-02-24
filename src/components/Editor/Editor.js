import React, { useState, useContext, useEffect, useRef } from 'react';
import Editor from 'rich-markdown-editor';
import {Link} from 'react-router-dom';
import { debounce, } from 'lodash-es';
import {Button, Text, Menu, Box, Markdown} from 'grommet';
import removeMd from 'remove-markdown';
import _ from 'lodash-es';
import Layout from '../Layout/Layout';
import * as dayjs from 'dayjs';
import {gql, useMutation} from '@apollo/client';


import {useQuery} from '@apollo/client';

import { useHistory, useParams } from "react-router-dom";

import './editor.css';
import { GlobalContext } from '../../contexts/GlobalContext/globalcontext';
import { LinkPrevious, More } from 'grommet-icons';

import ReactToPrint from 'react-to-print';

const Get_JOURNAL_BY_ID = gql`
  query GetJournal($id: ID!, $googleId: String!) {
    journal(id: $id, googleId: $googleId) {
        content
        completed
        createdAt
      }
  }
`
const DELETE_JOURNAL = gql`
  mutation DeleteJournal($id: ID!, $googleId: String!) {
    deleteJournal(id: $id, googleId: $googleId ){
      createdAt
    }
  }
`

const UPDATE_JOURNAL = gql`
  mutation UpdateJournal($id: String!, $content: String, $count: Float, $completed: Boolean) {
    updateJournal(id: $id, content: $content, count: $count, completed:$completed ){
      content
    }
  }
`


const savedText = localStorage.getItem('saved');
const exampleText = ``
let defaultValue = savedText || exampleText;


const FunctionMarkdownEditor = () => {
  let {id} = useParams();
  console.log(id);

  const [word, setWord] = useState(defaultValue)
  const [cleanWord, setCleanWord] = useState("");
  const [readOnly, setreadonly] = useState(false)
  const [template, setTemplate] = useState(false)
  const [dark, setDark] = useState(localStorage.getItem('dark') === "enabled")
  const [value, setValue]= useState(undefined);
  const [saved, setSaved] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'))

  const componentRef = useRef();
  
  const userAccount = user?.googleId


  const { loading, error, data } = useQuery(Get_JOURNAL_BY_ID, {
    variables: {
      id: id,
      googleId: userAccount
    }, onCompleted: (data) => {
      const journal = data?.journal.content 
      defaultValue = String(journal)
      setValue(defaultValue)
    }
  });
  const {journalList} = useContext(GlobalContext);

  
  const count = cleanWord.length
  const [updateJournal] = useMutation(UPDATE_JOURNAL, {
    onCompleted:(data) => {console.log("Saved", data);setSaved(false)}
  });
  //deleting the journal 
  const history = useHistory();
  const [deletejournal] = useMutation(DELETE_JOURNAL, {
    onCompleted: () => {
      console.log("deleted the data");
      history.push('/dashboard?refresh=true')}
  })
  useEffect(() => {
    if (count >= 1) {
      updateJournal({
        variables: {
          id: id,
          content: word,
          count: count,
          completed: true
        }
      })
    }
  }, [count]);

  const handlePdf = async () => {
    

  }

  const handleToggleReadOnly = () => {
    setreadonly(!readOnly);
  }
  const handleToggleTemplate = ()  => {
    setTemplate(!template);
  }
  const handleToggleDark = () => {
    alert('We are working on themes')
    // setDark(!dark)
    // localStorage.setItem("dark", dark ? "enabled" : "disabled");
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

  const DELETE = () => {
    //delete mutation
    //redirect to /dashboard
    deletejournal({variables: {
      id: id,
      googleId: userAccount
    }, 
    // update: cache => {
    //   const data = cache.readQuery({query: GET_JOURNAL_BY_USER});
    //   data.items = data.items.filter(({id: itemId}) => itemId !== id);
    //   cache.writeQuery({query: GET_JOURNAL_BY_USER}, data);
    // }
  })
  }
  // date
  const date = data ? dayjs(data?.journal.createdAt) : new dayjs();

  const { body } = document;


  if (body) body.style.backgroundColor = dark ? "#181A1B" : "#FFF";
  return(
    <Box width="large">
    <Box direction="row" justify="between" gap="large" >
    <Box direction="column" margin="small">
              <Link to="/dashboard" >
                <LinkPrevious size="small"/>
                <Text color="dark-2" weight="normal">Dashboard</Text>
              </Link>
      </Box>
      <Box  style={{zIndex: '1'}}>
      <Menu
        dropProps={{ align: { top: 'bottom', right: 'right' } }}
        icon={<More size="medium"/>}
        items={[
          { label: 'ReadMode', onClick: () => { handleToggleReadOnly()} },
          { label: 'DarkMode', onClick: () => { handleToggleDark()} },
          { label: 'Update', onClick: () => {handleUpdateValue()} },
          { label: 'FullScreen', onClick: () => {fullscreeentoggle()} },
          {label: 'Delete', onClick: () => {DELETE()}},
          {label: 'Removemarkdown', onClick: () => {removingMarkdown()}},
          {label:"PDF", onClick: () => {handlePdf()}}
        ]}
      />
      </Box>
    </Box>
    <Box>
    <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
    <Box  direction="row" justify="between" gap="medium">
    <Text color="dark-2" weight="normal" textAlign="center">
              {date.format('MMMM DD, YYYY')}
            </Text>
      <Button  type="button" label={saved? "saving":"commit"} size="small" color="green"  onClick={() => {
    setSaved(true)
    updateJournal({
      variables: {
        id: id,
        content: word,
        count: count,
        completed: true
      }
    })
  }} />
    </Box>
    
    
            
    <Editor
      ref={componentRef}
          id="example"
          readOnly={readOnly}
          readOnlyWriteCheckboxes
          className="editorContainer"
          value={value}
          template={template}
          defaultValue={loading? "Loading": defaultValue}
          scrollTo={window.location.hash}
          handleDOMEvents={{
            focus: () => console.log("FOCUS"),
            blur: () => console.log("BLUR"),
            paste: () => console.log("PASTE"),
            touchstart: () => console.log("TOUCH START"),
          }}
          onSave={options => updateJournal({
            variables: {
              id: id,
              content: word,
              count: count,
              completed: true
            }
          })}
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
          autoFocus
        />

    </Box>
    </Box>
  )
}

const MarkdownEditor = () => {
    return(
        <Layout>
            <Box direction="row-responsive" justify="center">
                <FunctionMarkdownEditor className="containerEditor" />
            </Box>
        </Layout>
    )

}


export default MarkdownEditor;