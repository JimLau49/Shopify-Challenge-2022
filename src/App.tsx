import { useEffect, useState, useRef } from 'react';
import './App.css';

export const App = () => {
  const [choices, setChoices] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<any>('Hello, how are you doing?');
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const payload = {
      prompt: `${prompts}`,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    fetch('https://api.openai.com/v1/engines/text-curie-001/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response) => setChoices([response.choices[0].text, ...choices]));

    console.log(choices);
  }, [prompts]);

  const handleClick = () => {
    setPrompts(ref.current?.value);
    console.log(prompts);
  };

  return (
    <div className='App'>
      <textarea ref={ref} id='message' name='message' />
      <button type='submit' onClick={handleClick}>
        Submit
      </button>

      {choices.map((choice) => (
        <p>{choice}</p>
      ))}
    </div>
  );
};
