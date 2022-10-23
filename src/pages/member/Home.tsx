import {
  AddIcon,
  HomeIcon,
  PersonIcon,
  SettingsIcon
} from '../../components/icons';
import { useAppSelector } from '../../hooks';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useGetThemesQuery } from '../../services/firebase';
import { RootState } from '../../store';

function Home() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  useDocumentTitle('Home');
  const { data: themes } = useGetThemesQuery();
  // const { data: targets } = useGetAwardTargetsQuery();
  console.log('Home!', themes);

  return (
    <>
      <header
        className="grid grid-cols-[auto_1fr_auto] place-content-center place-items-center bg-girlguiding-primary-blue text-girlguiding-primary-white px-4 py-4"
        data-programme={user?.unit.guidingProgramme}
      >
        <PersonIcon width={32} height={32} />
        <h1 className="text-lg uppercase font-bold">Home</h1>
        <PersonIcon width={32} height={32} />
      </header>
      <div className="bg-girlguiding-primary-blue text-girlguiding-primary-white text-center p-4">
        <h1 className="bg-girlguiding-primary-black text-girlguiding-primary-white text-center inline-block rounded-lg px-4 py-1 mx-auto">
          {user?.displayName}
        </h1>
        <small className="block text-center">{user?.unit.displayName}</small>
      </div>
      <div>
        <div className="bg-know-myself-20 p-4">
          <span className="text-know-myself text-lg font-bold block">
            Know Myself
          </span>
          <span className="text-know-myself-70 block">Personal Brand</span>
        </div>
        <div className="bg-express-myself-20 p-4">
          <span className="text-express-myself text-lg font-bold block">
            Express Myself
          </span>
          <span className="text-express-myself-70 block">
            Communication (Stage 5)
          </span>
        </div>
      </div>
      <nav className="fixed inset-0 top-auto grid grid-flow-col place-content-between place-items-center bg-girlguiding-primary-white px-4 py-2">
        <HomeIcon width={32} height={32} />
        <div className="bg-girlguiding-primary-black text-girlguiding-primary-white rounded-full p-4 -mt-12">
          <AddIcon width={32} height={32} />
        </div>
        <SettingsIcon width={32} height={32} />
      </nav>
    </>
  );
}

export default Home;
