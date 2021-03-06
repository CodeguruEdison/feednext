// Antd dependencies
import { Form, Button, Descriptions, Divider, Modal, Avatar } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'

// Other dependencies
import React, { useContext } from 'react'

// Local files
import { PageHelmet } from '@/components/PageHelmet'
import { Step2Props } from '../../types'
import StepContext from '../../StepContext'
import styles from './index.less'

const formItemLayout = {
	labelCol: {
		span: 5,
	},
	wrapperCol: {
		span: 19,
	},
}

const Step2 = (props: Step2Props): JSX.Element => {
	const [form] = Form.useForm()
	const { createTitleFormData, readableCategoryValue, firstEntryForm } = useContext(StepContext)

	const { stepMovementTo, setFirstEntryForm, setIsRequestReady } = props

	const onPrev = (): void => {
		setFirstEntryForm((state: any) => ({...state, text: form.getFieldValue('entry') }))
		stepMovementTo('main')
	}

	const onValidateForm = (): void => {
		if (!form.getFieldValue('entry')) return

		setFirstEntryForm({
			text: form.getFieldValue('entry')
		})
		setIsRequestReady(true)
	}

	const confirmationModal = (): void => {
		if (!form.getFieldValue('entry')) return
		Modal.confirm({
			centered: true,
			title: 'You are about to post this feed. Are you sure ?',
			icon: <ExclamationCircleOutlined />,
			okText: 'Yes',
			cancelText: 'No',
			onOk() {
				onValidateForm()
			},
		})
	}

	return (
		<>
			<PageHelmet
				title="Enter First Entry"
				description="Best reviews, comments, feedbacks about anything around the world"
				mediaImage="https://avatars1.githubusercontent.com/u/64217221?s=200&v=4"
				mediaDescription="Best reviews, comments, feedbacks about anything around the world"
			/>
			<Form {...formItemLayout} form={form} initialValues={{ entry: firstEntryForm.text }} layout="horizontal" className={styles.stepForm}>
				<Descriptions column={1}>
					<Descriptions.Item label="Title Image">
						<Avatar
							src={createTitleFormData.imageBase64}
							size="large"
							shape="square"
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Category">
						{ readableCategoryValue }
					</Descriptions.Item>
					<Descriptions.Item label="Title">
						{ createTitleFormData.name }
					</Descriptions.Item>
				</Descriptions>
				<Divider style={{ margin: '24px 0' }} />
				<Form.Item rules={[{ required: true, message: 'Please fill the input above' }]} label="Entry" name="entry">
					<TextArea placeholder="Share us your thoughts about the title that you are creating" allowClear autoSize={{ minRows: 4 }} />
				</Form.Item>
				<Form.Item
					style={{ marginBottom: 8 }}
					wrapperCol={{
						xs: { span: 24, offset: 0 },
						sm: {
							span: formItemLayout.wrapperCol.span,
							offset: formItemLayout.labelCol.span,
						},
					}}
				>
					<Button type="primary" htmlType="submit" onClick={confirmationModal}>
						Post
					</Button>
					<Button onClick={onPrev} style={{ marginLeft: 8 }}>
						Previous Step
					</Button>
				</Form.Item>
				{confirmationModal}
			</Form>
		</>
	)
}
export default Step2
