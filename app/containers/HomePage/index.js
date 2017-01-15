 import React, { PropTypes } from 'react';
 import Helmet from 'react-helmet';
 import { connect } from 'react-redux';
 import { createStructuredSelector } from 'reselect';

 import { UserProfileRecord } from 'shared/models';
 import actions from 'containers/App/actions';
 import {
   selectLoading,
   selectUser,
   selectLastKwSyncDate,
   selectLastWkSyncDate,
   selectUserSyncNeeded,
   selectReviewSyncNeeded,
} from 'containers/App/selectors';

 import Wrapper from 'components/Wrapper';
 import LoadingIndicator from 'components/LoadingIndicator';
 import Container from 'components/Container';
 import Element from 'components/Element';
 import H2 from 'components/H2';
 import H3 from 'components/H3';
 import P from 'components/P';

 class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
   static propTypes = {
     loading: PropTypes.bool,
     user: PropTypes.instanceOf(UserProfileRecord),
     lastWkSyncDate: PropTypes.string.isRequired,
     lastKwSyncDate: PropTypes.string.isRequired,
   }

   render() {
     const { user, loading, lastWkSyncDate, lastKwSyncDate } = this.props;

     // TODO: create a container for re-use that shows loading or children based on a "loading" prop
     let content;
     if (loading) {
       content = (
         <Container>
           <LoadingIndicator />;
         </Container>
       );
     } else {
       content = (
         <Container flexRow justifyContent="space-between">
           <Element>
             <H2>Welcome Back {user.name}.</H2>
             <P>You are level {user.level}.</P>
             <P>You have {user.reviewCount} reviews waiting.</P>
             <P>You last synced with WK {lastWkSyncDate}</P>
             <P>You last synced with KW {lastKwSyncDate}</P>
           </Element>
           <Element>
             <H3>Announcements</H3>
             <P>Announcement 1</P>
             <P>Announcement 2</P>
             <P>Announcement 3</P>
           </Element>
         </Container>
       );
     }

     return (
       <div>
         <Helmet
           title="Dashboard"
           meta={[{ name: 'description', content: 'Kaniwani Dashboard' }]}
         />
         <Wrapper>
           {content}
         </Wrapper>
       </div>
     );
   }
 }

 export function mapDispatchToProps(dispatch) {
   return {
     loadUserData: (indicateLoading) => dispatch(actions.loadUserRequest(indicateLoading)),
     loadReviewsData: (indicateLoading) => dispatch(actions.loadReviewsRequest(indicateLoading)),
   };
 }

 const mapStateToProps = createStructuredSelector({
   loading: selectLoading,
   user: selectUser,
   lastKwSyncDate: selectLastKwSyncDate,
   lastWkSyncDate: selectLastWkSyncDate,
   isUserSyncNeeded: selectUserSyncNeeded,
   isReviewSyncNeeded: selectReviewSyncNeeded,
 });

 // Wrap the component to inject dispatch and state into it
 export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
