// import { useState } from 'react'
// import { Form, Select, Input, Button, Slider, DatePicker, Row, Col } from 'antd'
//
// const { Option } = Select
//
// const PatientConditionForm = () => {
//   const [symptoms, setSymptoms] = useState([])
//
//   const handleAddSymptom = () => {
//     setSymptoms([...symptoms, { symptom: '', date: null, severity: 0 }])
//   }
//
//   const handleRemoveSymptom = (index) => {
//     const newSymptoms = [...symptoms]
//     newSymptoms.splice(index, 1)
//     setSymptoms(newSymptoms)
//   }
//
//   const handleSymptomChange = (index, field, value) => {
//     const newSymptoms = [...symptoms]
//     newSymptoms[index][field] = value
//     setSymptoms(newSymptoms)
//   }
//
//   const onFinish = (values) => {
//     console.log('Received values of form:', values)
//   }
//
//   return (
//     <Form onFinish={onFinish} layout='vertical'>
//       <Form.Item
//         label='დაავადება'
//         name='disease'
//         rules={[{ required: true, message: 'გთხოვთ აირჩიოთ დაავადება!' }]}
//       >
//         <Select placeholder='აირჩიეთ დაავადება'>
//           <Option value='flu'>გრიპი</Option>
//           <Option value='cold'>ცივი</Option>
//           <Option value='covid'>COVID-19</Option>
//           <Option value='allergy'>ალერგია</Option>
//         </Select>
//       </Form.Item>
//
//       <Form.Item label='სიმპტომები'>
//         {symptoms.map((symptom, index) => (
//           <Row gutter={16} key={index} style={{ marginBottom: 16 }}>
//             <Col span={8}>
//               <Form.Item
//                 label='სიმპტომი'
//                 rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ სიმპტომი!' }]}
//               >
//                 <Input
//                   value={symptom.symptom}
//                   onChange={(e) => handleSymptomChange(index, 'symptom', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 label='თარიღი'
//                 rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ თარიღი!' }]}
//               >
//                 <DatePicker
//                   style={{ width: '100%' }}
//                   value={symptom.date}
//                   onChange={(date) => handleSymptomChange(index, 'date', date)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={6}>
//               <Form.Item
//                 label='ტკივილის სიმძლავრე'
//                 rules={[{ required: true, message: 'გთხოვთ მიუთითოთ ტკივილის სიმძლავრე!' }]}
//               >
//                 <Slider
//                   min={0}
//                   max={100}
//                   value={symptom.severity}
//                   onChange={(value) => handleSymptomChange(index, 'severity', value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={2}>
//               <Button type='link' onClick={() => handleRemoveSymptom(index)}>
//                 წაშლა
//               </Button>
//             </Col>
//           </Row>
//         ))}
//         <Button type='dashed' onClick={handleAddSymptom} style={{ width: '100%' }}>
//          სიმპტომის დამატება
//         </Button>
//       </Form.Item>
//
//       <Form.Item>
//         <Button type='primary' htmlType='submit'>
//           შენახვა
//         </Button>
//       </Form.Item>
//     </Form>
//   )
// }
//
// export default PatientConditionForm
