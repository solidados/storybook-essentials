import { Meta, StoryFn } from "@storybook/react/*";
import store from "../lib/store";
import { Provider } from "react-redux";
import { http, HttpResponse } from 'msw'
import { MockedState } from "./TaskList.stories";
import InboxScreen from "./InboxScreen";

export default {
  title: 'Todo/InboxScreen',
  component: InboxScreen,
  tags: ['autodocs'],
  decorators: [(story: StoryFn, context) => 
    <Provider store={store} >
      {story(context.args, context)}
    </Provider>
  ]
} as Meta

export const Default = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos?userId=1', () => {
          return new HttpResponse(null, { status: 403 })
        })
      ]
    }
  }
}
export const Error = {}
