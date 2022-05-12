import './response-tile.scss';

export interface IResponseTile {
  engine: string;
  prompt: string;
  response: string;
}

export const ResponseTile = ({ engine, prompt, response }: IResponseTile) => {
  return (
    <div className='response-tile__container'>
      <div className='response-tile__text-container'>
        <p>Prompt: {prompt}</p>
        <p>
          Response{` (${engine})`}: {response}
        </p>
      </div>
    </div>
  );
};
