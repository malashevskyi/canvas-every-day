import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import PostLayout from '../../layout/post';
import * as canvases from '../../canvases/_index';
// import useGUI from '../../hooks/useGUI';
import postsData from '../../data/postsData';
import { LoadSpinnerContext } from '../../context/loadSpinnerContext';
import NotFound from '../404';

const Post = ({ id }) => {
  const [, setSpinner] = useContext(LoadSpinnerContext);

  useEffect(() => {
    setSpinner({
      active: false,
      text: '',
    });

    return () => {
      setSpinner({
        active: true,
        text: '',
      });
    };
  }, [setSpinner]);

  const router = useRouter();
  // ! temporarily hide
  // const gui = useGUI();

  if (!postsData[id]) {
    return <NotFound title="Post" />;
  }

  const canvasIds = Object.keys(postsData);
  const thisPostIndex = canvasIds.findIndex((el) => el === id);

  const postTitle = 'Canvas animation №' + postsData[id].number;
  const postDescription =
    'Canvas animation - ' + postsData[id].tags.join(' / ');
  const tags = postsData[id].tags.join(', ');
  const url = `post/${id}`;


  return (
    <PostLayout
      postTitle={postTitle}
      postDescription={postDescription}
      tags={tags}
      url={url}
      faviconIndex={(thisPostIndex % 7) + 1}
    >
      {router.query.id &&
        (() => {
          const postName = '_' + id.replace(/-/g, '_');

          if (canvases[postName]) {
            const Canvas = canvases[postName];

            // ! temporarily hide gui (<Canvas gui={gui} />)
            return <Canvas />;
          }
          return '';
        })()}
    </PostLayout>
  );
};

Post.getInitialProps = (context) => ({ id: context.query.id });

export default Post;
