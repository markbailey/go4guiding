import { useEffect, useState } from 'react';
import appConfig from '../data/app-config.json';

const useDocumentTitle = (title: string) => {
  const [documentTitle, setDocumentTitle] = useState(title);
  useEffect(() => {
    const newTitle = `${documentTitle} | ${appConfig.company}`;
    document.title = newTitle;
  }, [documentTitle]);

  return [documentTitle, setDocumentTitle];
};

export default useDocumentTitle;
