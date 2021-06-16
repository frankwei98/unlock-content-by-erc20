import Head from 'next/head'
import dynamic from "next/dynamic";
import React, { useState } from 'react'
import { useWallet } from 'use-wallet'
import { useMemo } from 'react';
// dynamic load
const CreateSnippet = dynamic(() => import("../components/Create/CreateSnippet"), { ssr: false }) ;
const SnippetCreated = dynamic(() => import('../components/Create/SnippetCreated'), { ssr: false });
const GuideToConnect = dynamic(() => import('../components/GuideToConnect'), { ssr: false });


export default function CreateSnippetPage() {
  const wallet = useWallet()

  const [uploadedHash, setUploadedHash] = useState('')
  const isWalletConnected = useMemo(() => wallet.status === 'connected', [wallet])

  if (uploadedHash) {
    return <SnippetCreated uploadedHash={uploadedHash} />
  }
    
    
  return (
    <div>
      <Head>
        <title>Create & Lock Snippet</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {
        !isWalletConnected ?
          <GuideToConnect />
          : 
            <>
              <CreateSnippet onSent={async (res) => {
                setUploadedHash(res.hash)
              }} />
          </>
        }

      </main>

    </div>
  )
}
