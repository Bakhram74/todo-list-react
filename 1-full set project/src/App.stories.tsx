import App from "./App";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title:'TodoLists/App',
    component:App,
    decorators:[ReduxStoreProviderDecorator]
}as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = (args)=> <App/>

export const AppTemplateStory = Template.bind({})
