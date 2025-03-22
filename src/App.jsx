import { useState } from 'react'
import './App.css'
import Registration from './component/Registration/Registration'
import RegistrationList from './component/RegistrationList'

function App() {
  const [tab, setTab] = useState(0)

  return (
    <div >
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="me-2">
          <p aria-current="page"
            className={`${parseInt(tab) === 0 ? 'active text-blue-600 bg-gray-100' : ''} inline-block p-4  rounded-t-lg  dark:bg-gray-800 dark:text-blue-500`}
            onClick={() => setTab(0)}
          >Registration Form</p>
        </li>
        <li className="me-2">
          <p
            className={`${parseInt(tab) === 1 ? 'active text-blue-600 bg-gray-100' : ''} inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
            onClick={() => setTab(1)}
          >Student List</p>
        </li>

      </ul>

      {tab === 0 && <Registration setTab={setTab} />}
      {tab === 1 && <RegistrationList setTab={setTab} />}


    </div>
  )
}

export default App
