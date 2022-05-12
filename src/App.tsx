import { useEffect, useState, useRef } from 'react';
import './App.scss';
import { ResponseTile } from './components/response-tile/response-tile';

export const App = () => {
  const [choices, setChoices] = useState<string[]>([]);
  const [prompt, setPrompt] = useState<any>('Hello, how are you doing?');
  const [promptArray, setPromptArray] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [engine, setEngine] = useState<string>('text-curie-001');
  const [engineHistory, setEngineHistory] = useState<string[]>([]);

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const payload = {
      prompt: `${prompt}`,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    fetch(`https://api.openai.com/v1/engines/${engine}/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response) => setChoices([response.choices[0].text, ...choices]));

    setPromptArray([prompt, ...promptArray]);
    setEngineHistory([engine, ...engineHistory]);
  }, [prompt]);

  const handleClick = () => {
    setPrompt(ref.current?.value);
    setMessage('');
  };

  const handleDropdownChange = (event: React.ChangeEvent<any>) => {
    setEngine(event.target.value);
  };

  const responseTiles = promptArray.map((value, index) => {
    const response = choices[index];
    const engine = engineHistory[index];
    return (
      <ResponseTile
        key={index}
        engine={engine}
        prompt={value}
        response={response}
      />
    );
  });

  const handleMessageChange = (event: React.ChangeEvent<any>) => {
    setMessage(event.target.message);
  };

  return (
    <div className='app'>
      <h1 className='title'>Fun With AI</h1>
      <div>
        {message}
        <textarea
          className='text-area__box'
          placeholder='Write something here :)'
          ref={ref}
          value={message}
          onChange={handleMessageChange}
          rows={10}
          cols={75}
        />
      </div>
      <div className='button-container'>
        <select value={engine} onChange={handleDropdownChange}>
          <option value='text-curie-001'>text-curie-001</option>
          <option value='text-davinci-002'>text-davinci-002</option>
          <option value='text-babbage-001'>text-babbage-001</option>
          <option value='text-ada-001'>text-ada-001</option>
        </select>
        <button className='button' type='submit' onClick={handleClick}>
          Submit
        </button>
      </div>
      <h1>Responses</h1>
      {responseTiles}
    </div>
  );
};
