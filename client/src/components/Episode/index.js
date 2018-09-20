import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-static'
import {
  HEADER_HEIGHT,
  MAX_WIDTH,
  DRAWER_WIDTH
} from '../../constants/GlobalStyle'
import Doc from './Doc'

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: HEADER_HEIGHT
  },
  left: {
    width: DRAWER_WIDTH,
    padding: theme.spacing.unit * 3,
    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    background: '#a7cbd0',
    flexShrink: 0,
    position: 'fixed',
    left: 0,
    top: HEADER_HEIGHT,
    bottom: 0
  },
  listItem: {
    display: 'block',
    textDecoration: 'none',
    paddingBottom: theme.spacing.unit * 2
  },
  rightWrapper: {
    width: `calc(100% - 260px)`,
    marginLeft: DRAWER_WIDTH
  },
  right: {
    width: '100%',
    maxWidth: MAX_WIDTH,
    margin: '24px auto',
    overflowY: 'auto'
  },
  title: {
    textAlign: 'center'
  }
})

class Episode extends Component {
  render() {
    const { classes: s, course, episodes, episode, markdown } = this.props
    return (
      <div className={s.root}>
        <div className={s.left}>
          <div>
            <Link to={`/${course.id}`}>{course.title}</Link>
          </div>
          {episodes.map(ep => (
            <Link
              to={`/${course.id}/${ep.id}`}
              className={s.listItem}
              key={ep.id}
            >
              <Typography>{ep.title}</Typography>
            </Link>
          ))}
        </div>
        <div className={s.rightWrapper}>
          <div className={s.right}>
            <div className={s.title}>
              <Typography variant="headline">{episode.title}</Typography>
            </div>
            <Doc markdown={markdown} />
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Episode)
