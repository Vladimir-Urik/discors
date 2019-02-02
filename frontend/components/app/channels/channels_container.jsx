import { connect } from 'react-redux';
import Channels from './channels';
import { fetchChannels, createChannel, removeChannelErrors, deleteChannel } from '../../../actions/channel_actions';
import { withRouter } from 'react-router-dom';
import { deleteServer } from '../../../actions/server_actions';
import { fetchFriends, fetchFriendRequests } from '../../../actions/friends_actions';


const mapStateToProps = (state, ownProps) => {
  const serverId = ownProps.match.params.serverId;
  const channels = Object.values(state.entities.channels).filter(channel => channel.server_id == serverId);
  return {
    currentUser: state.entities.users[state.session.id],
    server: state.entities.servers[serverId] || {},
    channels,
    errors: state.errors.channel,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: serverId => dispatch(fetchChannels(serverId)),
    createChannel: channel => dispatch(createChannel(channel)),
    removeChannelErrors: () => dispatch(removeChannelErrors()),
    deleteServer: id => dispatch(deleteServer(id)),
    fetchFriends: () => dispatch(fetchFriends()),
    fetchFriendRequests: () => dispatch(fetchFriendRequests()),
    deleteChannel: (id) => dispatch(deleteChannel(id)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Channels));
