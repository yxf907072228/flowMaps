import React from 'react'
import ReactDom from 'react-dom'
import WorkFlow from '../src/index'
import * as data from '../src/FLOW_MAP_DATA'


ReactDom.render(<WorkFlow config={data}/>, document.getElementById('paper'));