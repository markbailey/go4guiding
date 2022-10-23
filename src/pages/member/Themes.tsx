import { useParams } from 'react-router-dom';
import { ArrowBackIcon, PersonIcon } from '../../components/icons';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useGetThemeQuery } from '../../services/firebase';

function Themes() {
  useDocumentTitle('Themes');
  const params = useParams();
  const { data: theme } = useGetThemeQuery(params.theme);
  console.log('Themes!', theme, params);

  return (
    <div className="bg-express-myself-20 min-h-screen p-4 pt-20">
      <header className="fixed inset-0 bottom-auto grid grid-cols-[auto_1fr_auto] place-content-center place-items-center bg-express-myself text-girlguiding-primary-white px-4 py-4">
        <ArrowBackIcon width={32} height={32} />
        <h1 className="text-lg uppercase font-bold">Express Myself</h1>
        <PersonIcon width={32} height={32} />
      </header>
    </div>
  );
}

export default Themes;
