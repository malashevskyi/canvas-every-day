import { useState, useEffect, useContext } from 'react';
import { List, WindowScroller, AutoSizer } from 'react-virtualized';

import postsData from '../data/postsData';
import useWindowSize from '../hooks/useWindowSize';
import Card from '../components/card';
import LoadSpinner from '../components/loadSpinner';
import { LoadSpinnerContext } from '../context/loadSpinnerContext';

import 'react-virtualized/styles.css';

const gapSize = 10;
const cardHeight = 130;
const cardWidth = 290;

function rowRenderer(
  scrollDirection,
  dataArr,
  columnCount,
  anmRenderFirstScreen,
  { key, index, style }
) {
  // This is the range of cards visible on this row, given the current width:
  const startIndex = index * columnCount;
  const stopIndex = Math.min(
    dataArr.length - 1, // last item
    startIndex + columnCount - 1
  );

  // count of cards in one row
  const cards = [];

  for (let i = startIndex; i <= stopIndex; i++) {
    const cardData = dataArr[i];
    const title = dataArr[i].title;
    const id = dataArr[i].id;

    cards.push(
      <Card
        index={i}
        indexInItem={i - startIndex}
        width={cardWidth}
        height={cardHeight - 10} // - margin
        date={id}
        margin={`0 ${gapSize / 2}px`}
        link={`/post/${dataArr[i].id}`}
        title={title}
        id={id}
        scrollDirection={scrollDirection}
        anmRenderFirstScreen={anmRenderFirstScreen}
      />
    );
  }

  return (
    <div className="item" key={key} style={style}>
      {cards}
    </div>
  );
}

function getPostsDataArray(obj) {
  const data = [];

  Object.keys(obj).forEach((key) => {
    data.push({
      id: key,
      title:
        'Canvas animation - ' + obj[key].tags.join(', '),
    });
  });

  return data;
}

const Home = ({ comments, postsData }) => {
  const dataArr = getPostsDataArray(postsData);
  const [ scrollListTop, setScrollListTop ] = useState(0);
  const [ scrollDirection, setScrollDirection ] = useState('down');

  // more powerful animation on the first render for first screen cards 
  const [ anmRenderFirstScreen, setAnmRenderFirstScreen ] = useState(true);

  const [isActive, setIsActive] = useContext(LoadSpinnerContext);

  useEffect(() => {
    // remove loader
    setIsActive(false);

    // more lighter animation for new cards to be displayed when scrolling
    setTimeout(() => {
      setAnmRenderFirstScreen(false);
    }, 1000)
  }, [])

  // set initial dimensions to detect how many card render on server side;
  // render 42 cards -- 6 columns * 6 rows + 6 card auto adding, one to each column
  const size = useWindowSize({
    width: 1910, // 6 * card width
    height: 780, // 6 * card height
  });

  const columnCount = Math.floor( (size.width - gapSize) / (cardWidth + gapSize) );
  const rowCount = Math.ceil(dataArr.length / columnCount);

  const onListScrollHandler = ({ scrollTop }) => {
    if (scrollTop < scrollListTop) {
      setScrollDirection('up');
    } else {
      setScrollDirection('down');
    }
    setScrollListTop(scrollTop);
  }

  return (
    <div className="main">
      <LoadSpinner />
      <List
        width={size.width}
        height={size.height}
        rowCount={rowCount}
        onScroll={onListScrollHandler}
        rowHeight={cardHeight}
        overscanRowCount={0}
        rowRenderer={(rowArgs) =>
          rowRenderer(
            scrollDirection,
            dataArr,
            columnCount,
            anmRenderFirstScreen,
            rowArgs
          )
        }
      />
    </div>
  );
};

Home.getInitialProps = async function () {
  return {
    postsData,
  };
};

export default Home;
