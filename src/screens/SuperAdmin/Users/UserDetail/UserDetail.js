import React, { useEffect, useState } from 'react';

import { Row, Col } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { Avatar } from '../../../../components/Avatar/Avatar';

const UserDetail = (props) => {

    const { closeDetail, user } = props;

    const [userDetail, setUserDetail] = useState([]);

    useEffect(() => {
        setUserDetail([
            { head: 'User Full Name:', value: getValue(user?.fullName) },
            { head: 'User Email:', value: getValue(user?.email) },
            { head: 'User Address:', value: getValue(user?.address?.streetAddress) },
            { head: 'User Phone Number:', value: getValue(user?.phoneNumber) }
        ]);
    }, [user]);

    const getValue = (val) => {
        return val ? val : '';
    }

    return(

        <div className="user-detail app-flex-column position-relative py-3 text-white">

            <FaTimes className="close-icon" onClick={closeDetail} />

                <Row className="mb-3 mt-2">
                    <Col xs={3} className="py-5">User Image:</Col>
                    <Col xs={9}>
                        <Avatar large name="user" src={user?.profileImage} />
                    </Col>
                </Row>

                {
                    userDetail.map((detail, index) => (
                        <Row className="mb-3" key={index}>
                            <Col xs={3}>{ detail.head }</Col>
                            <Col xs={9}>
                                <h6>{detail.value}</h6>
                            </Col>
                        </Row>
                    ))
                }

        </div>

    );

}

export default UserDetail;