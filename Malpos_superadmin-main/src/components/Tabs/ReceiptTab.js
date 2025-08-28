import React, { useState } from 'react'
import { Box } from '../elements'
import { Col, Form, Table } from 'react-bootstrap'
import { LabelField } from '../fields'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCaretDown, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons'
export default function ReceiptTab() {
    const [state, setState] = useState({
        showOption: false,
        staffOpen: false,
        courierOpen: false,
        hallOpen: false,
        ProductOpen: false,
        statusOpen: false,
        customerOpen: false,
        suspiciousOpen: false,
        productDeleteOpen: false,
        typeOpen: false,
        paymentOpen: false
      });
      const handleStateChange = (key) => {
        setState(prevState => {
          const newState = {};
          Object.keys(prevState).forEach(k => {
            newState[k] = (k === key) ? !prevState[k] : false;
          });
          return newState;
        });
      };
    return (
        <div>
            <Box className="receipt-tab-main">

                <Box className="receipt-tab-wrapper">
                <Box className="receipt-tab">
                    <Box className="receipt-textfield">
                        <LabelField type="text" placeholder="text" fieldSize="w-100 h-md" />
                    </Box>
                    <Box className="receipt-textfield">
                        <LabelField type="text" placeholder="text" fieldSize="w-100 h-md"
                        />
                    </Box>
                    <Box className="filter-box">
                        <Box className="filter-box-item">
                            <div onClick={() => handleStateChange('showOption')}>
                                <span className='filter-box-span'>Terminals </span>
                                <span className='filter-box-span-count'>0</span>
                                <span className='filter-box-span-xmart'><FontAwesomeIcon icon={faXmark} /> </span>

                                <span className='filter-box-span-caret'><FontAwesomeIcon icon={faAngleDown} /> </span>
                            </div>
                            {
                                state.showOption ?
                                    <Box className="filter-box-select-opt">
                                        <Box className="filter-box-select-opt-box">
                                            <Box className="filter-box-search">
                                                <LabelField type="text" placeholder="Search here ..." fieldSize="w-100 h-md" />
                                            </Box>
                                            <Box className="filter-box-checkbox-main">

                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Terminal 1" />
                                                    </Box>
                                                </Box>

                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Terminal 2" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Terminal 3" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Call Center" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Clopas Test" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="t5" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="t6" />
                                                    </Box>
                                                </Box>
                                            </Box>

                                        </Box>
                                    </Box>
                                    : ""
                            }
                        </Box>
                    </Box>
                    <Box className="filter-box">
                        <Box className="filter-box-item">
                            <div onClick={() => handleStateChange('staffOpen')} >
                            <span className='filter-box-span'>Staff </span>
                            <span className='filter-box-span-caret'><FontAwesomeIcon icon={faAngleDown} /> </span>
                            </div>
                            {
                                state.staffOpen ?
                                    <Box className="filter-box-select-opt">
                                        <Box className="filter-box-select-opt-box">
                                            <Box className="filter-box-search">
                                                <LabelField type="text" placeholder="Search here ..." fieldSize="w-100 h-md" />
                                            </Box>
                                            <Box className="filter-box-checkbox-main">
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="TIS Software" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Cashier" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Waiter 2" />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    : ""
                            }
                        </Box>
                    </Box>
                    <Box className="filter-box">
                        <Box   className="filter-box-item">
                            <div onClick={() => handleStateChange('courierOpen')}>
                            <span className='filter-box-span'>Courier </span>
                            <span className='filter-box-span-caret'><FontAwesomeIcon icon={faAngleDown} /> </span>
                            </div>
                            {
                                state.courierOpen ?
                                    <Box className="filter-box-select-opt">
                                        <Box className="filter-box-select-opt-box">
                                            <Box className="filter-box-search">
                                                <LabelField type="text" placeholder="Search here ..." fieldSize="w-100 h-md" />
                                            </Box>
                                            <Box className="filter-box-checkbox-main">
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Waiter 2" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="MOHAMMAD" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Abdul Rehman" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Ahad" />
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Box>
                                    </Box>
                                    : ""
                            }
                        </Box>
                    </Box>
                    <Box className="filter-box">
                        <Box  className="filter-box-item">
                            <div onClick={() => handleStateChange('hallOpen')}>
                            <span className='filter-box-span'>Hall </span>
                            <span className='filter-box-span-caret'><FontAwesomeIcon icon={faAngleDown} /> </span>
                            </div>
                            {
                                state.hallOpen ?
                                    <Box className="filter-box-select-opt">
                                        <Box className="filter-box-select-opt-box">
                                            <Box className="filter-box-search">
                                                <LabelField type="text" placeholder="Search here ..." fieldSize="w-100 h-md" />
                                            </Box>
                                            <Box className="filter-box-checkbox-main">
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Waiter 2" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="MOHAMMAD" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Abdul Rehman" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Ahad" />
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Box>
                                    </Box>
                                    : ""
                            }
                        </Box>
                    </Box>
                    <Box className="filter-box">
                        <Box className="filter-box-item">
                            <div  onClick={() => handleStateChange('ProductOpen')}>
                            <span className='filter-box-span'>Product </span>
                            <span className='filter-box-span-caret'><FontAwesomeIcon icon={faAngleDown} /> </span>
                            </div>
                            {
                                state.ProductOpen ?
                                    <Box className="filter-box-select-opt">
                                        <Box className="filter-box-select-opt-box">
                                            <Box className="filter-box-search">
                                                <LabelField type="text" placeholder="Search here ..." fieldSize="w-100 h-md" />
                                            </Box>
                                            <Box className="filter-box-checkbox-main">
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Waiter 2" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="MOHAMMAD" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Abdul Rehman" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Ahad" />
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Box>
                                    </Box>
                                    : ""
                            }
                        </Box>
                    </Box>
                    <Box className="filter-box">
                        <Box  className="filter-box-item">
                            <div onClick={() => handleStateChange('statusOpen')}>
                            <span className='filter-box-span'>Status </span>
                            <span className='filter-box-span-caret'><FontAwesomeIcon icon={faAngleDown} /> </span>
                            </div>
                            {
                                state.statusOpen ?
                                    <Box className="filter-box-select-opt filter-box-select-opt-status">
                                        <Box className="filter-box-select-opt-box">
                                            
                                            <Box className="filter-box-checkbox-main">
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Waiter 2" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="MOHAMMAD" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Abdul Rehman" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Ahad" />
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Box>
                                    </Box>
                                    : ""
                            }
                        </Box>
                    </Box>
                    <Box className="filter-box">
                        <Box  className="filter-box-item">
                          <div onClick={() => handleStateChange('customerOpen')}>
                            <span className='filter-box-span'>Customer </span>
                            <span className='filter-box-span-caret'><FontAwesomeIcon icon={faAngleDown} /> </span>
                            </div>
                            {
                                state.customerOpen ?
                                    <Box className="filter-box-select-opt">
                                        <Box className="filter-box-select-opt-box">
                                            <Box className="filter-box-search">
                                                <LabelField type="text" placeholder="Search here ..." fieldSize="w-100 h-md" />
                                            </Box>
                                            <Box className="filter-box-checkbox-main">
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Waiter 2" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="MOHAMMAD" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Abdul Rehman" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Ahad" />
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Box>
                                    </Box>
                                    : ""
                            }
                        </Box>
                    </Box>
                   
                    <Box className="filter-box">
                        <Box  className="filter-box-item">
                          <div onClick={() => handleStateChange('courierOpen')}>
                            <span className='filter-box-span'>Courier </span>
                            <span className='filter-box-span-caret'><FontAwesomeIcon icon={faAngleDown} /> </span>
                            </div>
                            {
                                state.courierOpen ?
                                    <Box className="filter-box-select-opt">
                                        <Box className="filter-box-select-opt-box">
                                            <Box className="filter-box-search">
                                                <LabelField type="text" placeholder="Search here ..." fieldSize="w-100 h-md" />
                                            </Box>
                                            <Box className="filter-box-checkbox-main">
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Waiter 2" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="MOHAMMAD" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Abdul Rehman" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Ahad" />
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Box>
                                    </Box>
                                    : ""
                            }
                        </Box>
                    </Box>
                    <Box className="filter-box">
                        <Box  className="filter-box-item">
                           <div onClick={() => handleStateChange('suspiciousOpen')}>
                            <span className='filter-box-span'>Suspicous Action </span>
                            <span className='filter-box-span-caret'><FontAwesomeIcon icon={faAngleDown} /> </span>
                            </div>
                            {
                                state.suspiciousOpen ?
                                    <Box className="filter-box-select-opt">
                                        <Box className="filter-box-select-opt-box">
                                            <Box className="filter-box-search">
                                                <LabelField type="text" placeholder="Search here ..." fieldSize="w-100 h-md" />
                                            </Box>
                                            <Box className="filter-box-checkbox-main">
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Waiter 2" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="MOHAMMAD" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Abdul Rehman" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Ahad" />
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Box>
                                    </Box>
                                    : ""
                            }
                        </Box>
                    </Box>
                    <Box className="filter-box">
                        <Box  className="filter-box-item">
                            <div onClick={() => handleStateChange('productDeleteOpen')}>
                            <span className='filter-box-span'>Product Delete Tags </span>
                            <span className='filter-box-span-caret'><FontAwesomeIcon icon={faAngleDown} /> </span>
                            </div>
                            {
                                state.productDeleteOpen ?
                                    <Box className="filter-box-select-opt">
                                        <Box className="filter-box-select-opt-box">
                                            <Box className="filter-box-search">
                                                <LabelField type="text" placeholder="Search here ..." fieldSize="w-100 h-md" />
                                            </Box>
                                            <Box className="filter-box-checkbox-main">
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Waiter 2" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="MOHAMMAD" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Abdul Rehman" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Ahad" />
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Box>
                                    </Box>
                                    : ""
                            }
                        </Box>
                    </Box>
                    <Box className="filter-box">
                        <Box  className="filter-box-item">
                           <div onClick={() => handleStateChange('typeOpen')}>
                            <span className='filter-box-span'>Select Type </span>
                            <span className='filter-box-span-caret'><FontAwesomeIcon icon={faAngleDown} /> </span>
                            </div>
                            {
                                state.typeOpen ?
                                    <Box className="filter-box-select-opt">
                                        <Box className="filter-box-select-opt-box">
                                            <Box className="filter-box-search">
                                                <LabelField type="text" placeholder="Search here ..." fieldSize="w-100 h-md" />
                                            </Box>
                                            <Box className="filter-box-checkbox-main">
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Waiter 2" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="MOHAMMAD" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Abdul Rehman" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Ahad" />
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Box>
                                    </Box>
                                    : ""
                            }
                        </Box>
                    </Box>
                    <Box className="filter-box">
                        <Box  className="filter-box-item">
                           <div onClick={() => handleStateChange('paymentOpen')}>
                            <span className='filter-box-span'>Payment Method </span>
                            <span className='filter-box-span-caret'><FontAwesomeIcon icon={faAngleDown} /> </span>
                            </div>
                            {
                                state.paymentOpen ?
                                    <Box className="filter-box-select-opt">
                                        <Box className="filter-box-select-opt-box">
                                            <Box className="filter-box-search">
                                                <LabelField type="text" placeholder="Search here ..." fieldSize="w-100 h-md" />
                                            </Box>
                                            <Box className="filter-box-checkbox-main">
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Waiter 2" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="MOHAMMAD" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Abdul Rehman" />
                                                    </Box>
                                                </Box>
                                                <Box className="filter-box-checkbox-div">
                                                    <Box className="filter-box-checkbox">
                                                        <Form.Check type="checkbox" label="Ahad" />
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Box>
                                    </Box>
                                    : ""
                            }
                        </Box>
                    </Box>
                    <Box className="reciept-check-box reciept-check-box-child-f ">
                        <Form.Check type="checkbox" label="Show deleted receipt" />

                    </Box>
                    <Box className="reciept-check-box reciept-check-box-child-f">
                        <Form.Check type="checkbox" label="E-Kassa" />

                    </Box>
                </Box>
                </Box>
                


                <Box className="receip-table-m">
                    <Table responsive>
                        <thead className="thead-modifier">
                            <tr className='head-r'>
                                <th>#Receipt</th>
                                <th>Staff</th>
                                <th className='th-date'>Created at</th>
                                <th className='th-date'>Closed at</th>
                                <th className='th-w-80'>Terminal</th>
                                <th className='th-w-80'>Hall/Table</th>
                                <th className='th-w-80'>Subtotal
                                <br/>
                                <span>0.3345 SA</span>
                                </th>
                                <th className='th-w-30'>gift</th>
                                <th className='th-w-60' >Service
                                <br/>
                                <span>0.3345 SA</span>
                                </th>
                                <th className='th-w-70' >Discount
                                <br/>
                                <span>0.3345 SA</span></th>
                                <th className='th-w-70'>Delivery 
                                <br/>
                                <span>0.3345 SA</span></th>
                                <th className='th-w-70'>Tax
                                <br/>
                                <span>0.3345 SA</span></th>
                                <th className='th-w-60'>E-Kasa
                                <br/>
                                <span>0.3345 SA</span></th>
                                <th className='th-w-60'>Sum
                                <br/>
                                <span>0.3345 SA</span></th>
                                <th className='th-w-60'>Payment </th>
                                <th className='th-w-60'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='tbody-r'>
                             <Link to='/receipt-edit ' className="receipt-link"> <td className='tbody-data-id'>1009</td></Link>
                                <td>TIS Sofware</td>
                                <td className='td-date'>Mar 09,23</td>
                                <td className='td-date'>Mar 09,23</td>
                                <td className='td-w-80'>Terminal 1</td>
                                <td className='td-w-80' >Take away</td>
                                <td className='td-w-80'>62.22 SA</td>
                                <td className='td-w-30'><FontAwesomeIcon icon={faMinus}/> </td>
                                <td className='td-w-60'><FontAwesomeIcon icon={faMinus}/></td>
                                <td className='td-w-70'>0.00 SA</td>
                                <td className='td-w-70'> 0.00 SA</td>
                                <td className='td-w-70'>9.78 SA</td>
                                <td className='td-w-60'><FontAwesomeIcon icon={faMinus}/></td>
                                <td className='td-w-60'>75.00</td>
                                <td className='td-w-60'><span className='payment-type'>C</span></td>
                                <td className='td-w-60'>Paid</td>
                            </tr>
                            <tr className='tbody-r'>
                            <Link to='/receipt-edit' className="receipt-link"><td className='td-active'><span></span>1009</td></Link>
                                <td>TIS Sofware</td>
                                <td className='td-date'>Mar 09,23</td>
                                <td className='td-date'>Mar 09,23</td>
                                <td className='td-w-80'>Terminal 1</td>
                                <td className='td-w-80' >Take away</td>
                                <td className='td-w-80'>62.22 SA</td>
                                <td className='td-w-30'><FontAwesomeIcon icon={faMinus}/> </td>
                                <td className='td-w-60'><FontAwesomeIcon icon={faMinus}/></td>
                                <td className='td-w-70'>0.00 SA</td>
                                <td className='td-w-70'> 0.00 SA</td>
                                <td className='td-w-70'>9.78 SA</td>
                                <td className='td-w-60'><FontAwesomeIcon icon={faMinus}/></td>
                                <td className='td-w-60'>75.00</td>
                                <td className='td-w-60'><span className='payment-type'>C</span><span className='payment-type payment-type-v'>V</span></td>
                                <td className='td-w-60'>Paid</td>
                            </tr>
                            <tr className='tbody-r'>
                            <Link to="/receipt-edit" className="receipt-link"><td className='tbody-data-id'>1009</td></Link>
                                <td>TIS Sofware</td>
                                <td className='td-date'>Mar 09,23</td>
                                <td className='td-date'>Mar 09,23</td>
                                <td className='td-w-80'>Terminal 1</td>
                                <td className='td-w-80' >Take away</td>
                                <td className='td-w-80'>62.22 SA</td>
                                <td className='td-w-30'><FontAwesomeIcon icon={faMinus}/> </td>
                                <td className='td-w-60'><FontAwesomeIcon icon={faMinus}/></td>
                                <td className='td-w-70'>0.00 SA</td>
                                <td className='td-w-70'> 0.00 SA</td>
                                <td className='td-w-70'>9.78 SA</td>
                                <td className='td-w-60'><FontAwesomeIcon icon={faMinus}/></td>
                                <td className='td-w-60'>75.00</td>
                                <td className='td-w-60'><span className='payment-type'>C</span></td>
                                <td className='td-w-60'>Paid</td>
                            </tr>
                        </tbody>
                    </Table>
                </Box>
            </Box>
        </div>
    )
}
