/**
 * User: Coul Turing
 * Date: 2018/7/30
 * @flow
 */
import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import { NoticeBar } from 'antd-mobile-rn'
import { NavigationActions } from 'react-navigation'

@connect()
export default class Notice extends PureComponent {
  onNoticeClick = notice => {
    this.props.dispatch({
      type: 'userCenter/notices/isReadNotice',
      payload: notice
    })
    !notice.closeable && notice.url &&
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'WebBrowser',
          params: {url: notice.url}
        })
      )

  }
  render () {
    const { notice } = this.props
    return (
      <NoticeBar mode={notice.closeable?'closable':'mode'} onClick={() => this.onNoticeClick(notice)}>
        {notice.title}
      </NoticeBar>
    )
  }
}
