import Head from 'next/head'
import Image from 'next/image'
import { useCallback, useMemo } from 'react'
import { useWallet } from 'use-wallet'
import { currentSupportedTokens } from '../constant/contracts'
import { useSigner } from '../hooks/useSigner'
import styles from '../styles/Home.module.css'

export default function Home() {
  const wallet = useWallet()
  const { signer, isSignerReady } = useSigner()

  const signMsg = useCallback(async () => {
    if (!isSignerReady(signer)) return;

    const sig = await signer._signTypedData({
          name: 'Ether Mail',
          version: '1',
          chainId: 56,
          verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
      },
      {
        Request: [
            { name: 'token', type: 'address' },
            { name: 'challenge', type: 'string' },
        ]
      }, 
      {
        token: currentSupportedTokens!.USDT,
        challenge: 'FOO_BAR_SOMETHING_IDENTIFIABLE'
      })

    console.info('sig', sig)

  }, [signer])

  return (
    <div className={styles.container}>
      <Head>
        <title>Unlock Content by ERC20</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Unlock Content by ERC20 Demo
        </h1>

        {
          !isSignerReady(signer) ? 
          <>
            <p>Connect Wallet by</p>
            <button onClick={() => wallet.connect('injected')}>MetaMask</button>
            <button onClick={() => wallet.connect('walletconnect')}>Wallet Connect</button>
          </>
          : 
          <>
            <button onClick={() => signMsg() }>Sign</button>
            <button onClick={() => wallet.reset()}>Disconnect</button>
          </>
        }

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
