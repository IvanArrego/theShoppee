import React from 'react';
// import imgUrl from './dist/images/takethis.png';

function Home(props) {
  return (
    <div>
      <div className = 'home-background'></div>
      <div className = "sword-background" onClick={() => props.setView('catalog', { })}></div>
    </div>
  );
}
export default Home;
