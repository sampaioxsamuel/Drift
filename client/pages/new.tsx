import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NewPost from '../components/new-post'
import { Page } from '@geist-ui/core'
import useSignedIn from '../lib/hooks/use-signed-in'
import Header from '../components/header'
import { ThemeProps } from './_app'
import { useRouter } from 'next/router'

const Home = ({ theme, changeTheme }: ThemeProps) => {
  const router = useRouter()
  const { isSignedIn, isLoading } = useSignedIn({ redirectIfNotAuthed: true })
  if (!isSignedIn && !isLoading) {
    router.push("/signin")
  }
  return (
    <Page className={styles.container} width="100%">
      <Head>
        <title>Drift</title>
      </Head>

      <Page.Header>
        <Header theme={theme} changeTheme={changeTheme} />
      </Page.Header>

      <Page.Content paddingTop={"var(--gap)"} width={"var(--main-content-width)"} margin="0 auto" className={styles.main}>
        {isSignedIn && <NewPost />}
      </Page.Content>
    </Page >
  )
}

export default Home
