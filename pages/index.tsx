import type { NextPage } from 'next'
import {useWallet} from "hooks/useWallet";
import {getENSNameByAddress} from "utils/getENSNameByAddress";

const Home: NextPage = () => {

  const {signWithWallet, connectWallet} = useWallet()

  const handleSignIn = async () => {
      try {
          await connectWallet()
          const signRes = await signWithWallet()
      } catch (error) {
          console.error(error)
      }
  }

  return (
      <div className="flex items-center justify-center h-screen">
          <div>
              <button
                  type="submit"
                  className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleSignIn}
              >
                  Continue with your wallet
              </button>
          </div>
      </div>
  )
}

export default Home
