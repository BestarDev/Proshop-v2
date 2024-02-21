import React, { useState } from 'react'
import { Col, Collapse, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TestScreen = () => {
    const options = ['Create', 'Purchase', 'Receive']
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);
  
    return (
        <>
            <Col style={{cursor:'pointer'}} onClick={toggleNavbar}>Purchase Order</Col>
            <Collapse in={!collapsed}>
                <ListGroup variant='flush' as={'ul'} className='ms-4'>
                    {options.map((option, idx) => (
                        <li key={idx}>
                            <Link to = '#'>{option}</Link>
                        </li>
                    ))}
                </ListGroup>
            </Collapse>
        </>
    );
}

export default TestScreen