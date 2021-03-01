import { useContext } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { LoadSpinnerContext } from '../context/loadSpinnerContext';

import Preview from './preview';

const Card = ({
  index,
  indexInItem,
  width,
  height,
  date,
  margin,
  link,
  id,
  title,
  scrollDirection,
  anmRenderFirstScreen
}) => {
  const [isActive, setIsActive] = useContext(LoadSpinnerContext);
  const yAnmUp = -30 * indexInItem - 50;
  const router = useRouter();
  let yAnmDown = 30 * indexInItem + 50;
  let delay = indexInItem / 100;

  if (anmRenderFirstScreen) {
    yAnmDown += index * 4;
    delay = index / 50;
  }

  const onCardClickHandler = (e) => {
    e.preventDefault();
    setIsActive(true);

    setTimeout(() => {
      router.push(link);
    }, 700);
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: scrollDirection === 'down'
            ? yAnmDown
            : yAnmUp,
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay,
      }}
    >
      <div
        key={index}
        className="card"
        style={{ width, height, margin }}
      >
        <Link href={link}>
          <a onClick={onCardClickHandler}>
            <time dateTime={date}>
              <span>{date}</span>
            </time>
            <Preview name={id} title={title} />
          </a>
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;