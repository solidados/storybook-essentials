import { Meta, StoryFn } from "@storybook/react/*";
import store from "../lib/store";
import { Provider } from "react-redux";
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

export const Default = {}
export const Error = {}
