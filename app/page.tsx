import Banner from './components/Banner/Banner';
import Companies from './components/Companies/Companies';
import Tabs from './components/Courses/Courses';
import Mentor from './components/Mentor/Mentor';
import Students from './components/Students/Students';
import Newsletter from './components/Newsletter/Newsletter';
import DropDownOptions from './components/BelowBanner/DropDownOptions';
export default function Home() {
  return (
    <>
      <Banner text={"Advanced Your Carrer With Us"}/>
      <DropDownOptions/>
      <Companies />
      <Tabs />
      <Mentor />
      <Students />
      <Newsletter />
    </>
  )
}
