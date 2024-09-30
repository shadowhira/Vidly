import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Hear = (props) => {
    return ( 
        <React.Fragment>
            <span onClick={props.onLiked}>
                {
                    props.liked ? 
                    <FontAwesomeIcon icon={fasHeart} size="lg" className='clickable' /> : 
                    <FontAwesomeIcon icon={farHeart} size="lg" className='clickable' />
                }
            </span>
        </React.Fragment>
     );
}
 
export default Hear;
