import { MutableRefObject, useEffect, useRef } from 'react';

function useScrollPosition(ref: MutableRefObject<HTMLDivElement | null>): MutableRefObject<number> {


  const scrollPosition = useRef(0);

  useEffect(() => {
    
    if (ref.current) {
      ref.current.scrollTop = scrollPosition.current;
    }

    const handleScroll = () => {
      scrollPosition.current = ref.current!.scrollTop;
    };

    if (ref.current) {
      ref.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref]);

  return scrollPosition;
}

export default useScrollPosition;