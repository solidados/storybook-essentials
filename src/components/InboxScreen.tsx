import { ReactElement, useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../lib/hooks"
import { fetchTasks, RootState } from "../lib/store"
import { ITaskBoxData } from "./types"
import TaskList from "./TaskList"

const InboxScreen = (): ReactElement => {
  const dispatch = useAppDispatch()
  const { error, status } = useSelector((state: RootState): ITaskBoxData => state.taskbox)

  useEffect((): void => {
    dispatch(fetchTasks() as any)
  }, [dispatch])

  if (status === 'loading') {
    return (
      <div className="page lists-show">
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <h3 className="title-message">Oh, no!</h3>
          <p className="subtitle-message">Something went wrong</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">Taskbox</h1>
      </nav>
      <TaskList />
    </div>
  )
}

export default InboxScreen