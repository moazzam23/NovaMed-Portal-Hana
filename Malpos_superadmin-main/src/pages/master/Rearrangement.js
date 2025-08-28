import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { ListGroup } from "react-bootstrap";
import { Box, Heading } from "../../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "../../data/master/arrangement.json";

import {
  faBars,
  faBoxOpen,
  faCheck,
  faArrowRotateLeft,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Rearrangement() {
  const [showSecondList, setShowSecondList] = useState(false);
  const [id, setId] = useState();

  const handleFirstItemClick = (id) => {
    setShowSecondList(true);
    setId(id);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = [...data.arrangement.main];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    data.arrangement.main = items;
  };
  const handleDragEnd1 = (result) => {
    if (!result.destination) {
      return;
    }
    const items = [...data.arrangement.submenu];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    data.arrangement.submenu = items;
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Box className="head-sec-rearrange">
                <Box className="head-sec-rearrange-left">
                  <h3 style={{ width: "300px" }}>Menu Re-arrangement</h3>
                </Box>
                <Box className="head-sec-rearrange-right">
                  <Box className="rearrange-right">
                    <button className="head-sec-rearrange-btn">
                      <FontAwesomeIcon icon={faArrowRotateLeft} />
                      &nbsp; Reset
                    </button>
                    <button className="head-sec-rearrange-btn">
                      <FontAwesomeIcon icon={faCheck} />
                      &nbsp; Save
                    </button>
                  </Box>
                </Box>
              </Box>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>

                <DragDropContext onDragEnd={handleDragEnd}>
                  <Col md={3}>
                    <Box className="reArrange-left">
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <ListGroup
                            variant="flush"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {data.arrangement.main.map((item, i) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={i}
                              >
                                {(provided, snapshot) => (
                                  <ListGroup.Item
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Row>
                                      <Col xs={3} sm={3} md={3}>
                                        <span>
                                          <FontAwesomeIcon
                                            icon={faBars}
                                            size="x1"
                                          />
                                        </span>
                                      </Col>
                                      <Col xs={9} sm={9} md={9}>
                                        <text
                                          onClick={() =>
                                            handleFirstItemClick(item.id)
                                          }
                                        >
                                          {item.name}
                                        </text>
                                      </Col>
                                    </Row>
                                  </ListGroup.Item>
                                )}
                              </Draggable>
                            ))}
                          </ListGroup>
                        )}
                      </Droppable>
                    </Box>
                  </Col>
                </DragDropContext>
                <DragDropContext onDragEnd={handleDragEnd1}>
                  <Col md={3}>
                    {showSecondList && (
                      <Box className="reArrange-left">
                        <Droppable droppableId="droppable1">
                          {(provided, snapshot) => (
                            <ListGroup
                              variant="flush"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {data.arrangement.submenu
                                .filter((item) => {
                                  return item.id == id;
                                })
                                .map((items) =>
                                  items.items.map((item, i) => (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={i}
                                    >
                                      {(provided, snapshot) => (
                                        // <ListGroup variant="flush" key={i}>
                                        <ListGroup.Item
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          // className="clearfix"
                                        >
                                          <Row>
                                            <Col xs={3} sm={3} md={3}>
                                              <FontAwesomeIcon
                                                icon={faCube}
                                                size="x1"
                                              />
                                            </Col>
                                            <Col xs={9} sm={9} md={9}>
                                              <text>{item.name}</text>
                                            </Col>
                                          </Row>
                                        </ListGroup.Item>
                                        // </ListGroup>
                                      )}
                                    </Draggable>
                                  ))
                                )}
                            </ListGroup>
                          )}
                        </Droppable>
                      </Box>
                    )}
                  </Col>
                </DragDropContext>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
// import React, { useState } from "react";
// import { Col, Row } from "react-bootstrap";
// import { Breadcrumb } from "../../components";
// import { CardLayout } from "../../components/cards";
// import PageLayout from "../../layouts/PageLayout";
// import { ListGroup } from "react-bootstrap";
// import { Box } from "../../components/elements";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import data from "../../data/master/arrangement.json";
// // import { useDrag, useDrop } from "react-dnd";
// // import { HTML5Backend } from "react-dnd-html5-backend";
// // import { DndProvider } from "react-dnd";

// import {
//   faBars,
//   faBoxOpen,
//   faCheck,
//   faArrowRotateLeft,
// } from "@fortawesome/free-solid-svg-icons";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// export default function Rearrangement() {
//   const [showSecondList, setShowSecondList] = useState(false);
//   const [id, setId] = useState();

//   const handleFirstItemClick = (id) => {
//     setShowSecondList(true);
//     setId(id);
//   };

//   const handleDragEnd = (result) => {
//     if (!result.destination) {
//       return;
//     }

//     const items = [...data.arrangement.main];
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     data.arrangement.main = items;
//   };

//   return (
//     <div>
//       <PageLayout>
//         <Row>
//           <Col md={12}>
//             <CardLayout>
//               <Box className="head-sec-rearrange">
//                 <Box className="head-sec-rearrange-left">
//                   <h3 style={{ width: "500px" }}>Menu Re-arrangement</h3>
//                 </Box>
//                 <Box className="head-sec-rearrange-right">
//                   <Box className="rearrange-right">
//                     <button className="head-sec-rearrange-btn">
//                       <FontAwesomeIcon icon={faArrowRotateLeft} />
//                       &nbsp; Reset
//                     </button>
//                     <button className="head-sec-rearrange-btn">
//                       <FontAwesomeIcon icon={faCheck} />
//                       &nbsp; Save
//                     </button>
//                   </Box>
//                 </Box>
//               </Box>
//             </CardLayout>
//           </Col>
//           <Col md={12}>
//             <CardLayout>
//               <Row>
//                 <DragDropContext onDragEnd={handleDragEnd}>
//                   <Col md={3}>
//                     <Box className="reArrange-left">
//                       <Droppable droppableId="droppable">
//                         {(provided, snapshot) => (
//                           <ListGroup
//                             variant="flush"
//                             ref={provided.innerRef}
//                             {...provided.droppableProps}
//                           >
//                             {data.arrangement.main.map((item, i) => (
//                               <Draggable
//                                 key={item.id}
//                                 draggableId={item.id}
//                                 index={i}
//                               >
//                                 {(provided, snapshot) => (
//                                   <ListGroup.Item
//                                     ref={provided.innerRef}
//                                     {...provided.draggableProps}
//                                     {...provided.dragHandleProps}
//                                     onClick={() =>
//                                       handleFirstItemClick(item.id)
//                                     }
//                                   >
//                                     <Row>
//                                       <Col xs={3} sm={3} md={3}>
//                                         <span>
//                                           <FontAwesomeIcon
//                                             icon={faBars}
//                                             size="x1"
//                                           />
//                                         </span>
//                                       </Col>
//                                       <Col xs={9} sm={9} md={9}>
//                                         <text>{item.name}</text>
//                                       </Col>
//                                     </Row>
//                                   </ListGroup.Item>
//                                 )}
//                               </Draggable>
//                             ))}
//                           </ListGroup>
//                         )}
//                       </Droppable>
//                     </Box>
//                   </Col>
//                 </DragDropContext>
//                 <Col md={3}>
//                   {showSecondList && (
//                     <Box className="reArrange-left">
//                       {data.arrangement.submenu
//                         .filter((item) => {
//                           return item.id == id;
//                         })
//                         .map((item, i) => (
//                           <ListGroup variant="flush" key={i}>
//                             <ListGroup.Item>
//                               <Row>
//                                 <Col xs={3} sm={3} md={3}>
//                                   <FontAwesomeIcon icon={faBoxOpen} size="x1" />
//                                 </Col>
//                                 <Col xs={9} sm={9} md={9}>
//                                   {item.items}
//                                 </Col>
//                               </Row>
//                             </ListGroup.Item>
//                             <ListGroup.Item>
//                               <Row>
//                                 <Col xs={3} sm={3} md={3}>
//                                   <FontAwesomeIcon icon={faBoxOpen} size="x1" />
//                                 </Col>
//                                 <Col xs={9} sm={9} md={9}>
//                                   ice coffee
//                                 </Col>
//                               </Row>
//                             </ListGroup.Item>
//                           </ListGroup>
//                         ))}
//                     </Box>
//                   )}
//                 </Col>
//               </Row>
//             </CardLayout>
//           </Col>
//         </Row>
//       </PageLayout>
//     </div>
//   );
// }
