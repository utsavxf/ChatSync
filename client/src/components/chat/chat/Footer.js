import React, { useContext, useEffect, useState } from 'react'
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { Picker } from "emoji-mart";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import "emoji-mart/css/emoji-mart.css";
import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import { uploadFile } from '../../../service/api';
import { AccountContext } from '../../../context/AccountProvider';
import "./Chat.css"
import EmojiPicker from 'emoji-picker-react';

//CSS

const Container = styled(Box)`
    height: 55px;
    background: #e9e1e1;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;

const ClipIcon = styled(AttachFile)`
    transform: rotate(40deg)
`;



const Footer = ({ sendText, setValue, value, file, setFile, setImage }) => {

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

    const { theme, setTheme } = useContext(AccountContext)

    const [initialListening, setInitialListening] = useState(false); 

    useEffect(() => {
        setInitialListening(false);
        const getImage = async () => {
            if (file) {
                //file cannnot be uploaded directly to mongodb,we have to break it in chunks
                const data = new FormData();
                data.append("name", file.name)
                data.append("file", file)


                let response = await uploadFile(data);
                setImage(response.data);


            }
        }

        getImage();

    }, [file])


    const [showEmojis, setShowEmojis] = useState(false);

    const handleEmojiClick = (event, emojiObject) => {
        const emoji = emojiObject.emoji;
        setValue(value + emoji); // Append the selected emoji to the input value
        setShowEmojis(false); // Close the emoji picker window
    };

   

      const [listen,setListen]=useState(false);


      const speechToText = () => {
        if (!listening) {
            SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
            setInitialListening(true); // Set initialListening to true when speech recognition starts
        } else {
            SpeechRecognition.stopListening();
            setInitialListening(false); // Set initialListening to false when speech recognition stops
        }
    };

    const onFileChange = (e) => {
        console.log(e);
        setFile(e.target.files[0]);  //console me dekha event object me
        setValue(e.target.files[0].name)  //file name input tag me aajayega

    }



    return (
        <Container id={theme} className='searchf'>
            <EmojiEmotions onClick={() => setShowEmojis(!showEmojis)} style={{ color: theme === 'light' ? 'black' : 'white', cursor: 'pointer' }}
            />
            {
                showEmojis && (
                    <div style={{ position: 'absolute', top: '368px', right: '757px', zIndex: '1000' }}>
                        <EmojiPicker style={{height:'291px',width:'282px'}} onEmojiClick={handleEmojiClick} />
                    </div>
                )
            }


            <label htmlFor="fileInput">
                <ClipIcon style={{ color: theme === 'light' ? 'black' : 'white', cursor: "pointer" }} />
            </label>
            <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => onFileChange(e)}  //file ke select hone par trigger hoga
            />

            <Search>
                <InputField
                    placeholder="Type a message"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={(e) =>
                        sendText(e)  }   //humne ye function hi le liya hai props me
                        value={value}
                />
            </Search>
            {
                 listening? <PauseCircleIcon onClick={speechToText}  style={{ color: theme === 'light' ? 'black' : 'white',cursor:"pointer" }} />:
              <Mic onClick={speechToText}  style={{ color: theme === 'light' ? 'black' : 'white',cursor:"pointer" }} />
            }
            {/* <p>{transcript}</p> */}

            
        </Container>
    )
}

export default Footer
