import './response-tile.scss';

export interface IResponseTile {
  prompt: string;
  response: string;
}

export const ResponseTile = ({ prompt, response }: IResponseTile) => {
  return (
    <div className='response-tile__container'>
      <div className='response-tile__text-container'>
        <p>Prompt: {prompt}</p>
        <p>Response: {response}</p>
      </div>
    </div>
  );
};
