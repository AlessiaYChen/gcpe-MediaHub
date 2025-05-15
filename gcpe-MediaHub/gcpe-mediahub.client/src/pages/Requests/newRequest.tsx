import React from 'react';
import {
    Title1,
    Title2,
    Dropdown,
    Option,
    Field,
    Divider,
    Input,
    Textarea,
    Button,
} from '@fluentui/react-components';
import { RequestStatus, RequestType, Ministry } from './requests';
import { CalendarEmpty24Regular } from '@fluentui/react-icons';
import styles from './newRequest.module.css';

const NewRequestPage: React.FC = () => {
    const [status, setStatus] = React.useState<RequestStatus | null>(null);
    const [requestType, setRequestType] = React.useState<RequestType | null>(null);
    const [leadMinistry, setLeadMinistry] = React.useState<Ministry | null>(null);
    const [additionalMinistry, setAdditionalMinistry] = React.useState<Ministry | null>(null);
    const [assignedTo, setAssignedTo] = React.useState('');
    const [notifiedRecipients, setNotifiedRecipients] = React.useState('');
    const [requestDetails, setRequestDetails] = React.useState('');
    const [requestTitle, setRequestTitle] = React.useState('');
    const [requestedBy, setRequestedBy] = React.useState('');
    const [deadline, setDeadline] = React.useState('');
    const [receivedOn, setReceivedOn] = React.useState('');
    const [showValidation, setShowValidation] = React.useState(false);

    const statusOptions = Object.entries(RequestStatus)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key]) => ({
            text: key,
            value: RequestStatus[key as keyof typeof RequestStatus].toString()
        }));

    const requestTypeOptions = Object.entries(RequestType)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key]) => {
            // Format the display text (e.g., "ScrumHalls" -> "Scrum/Halls")
            const text = key === 'ScrumHalls' ? 'Scrum/Halls' : key;
            return {
                text,
                value: RequestType[key as keyof typeof RequestType].toString()
            };
        });

    const dateInputRef = React.useRef<HTMLInputElement>(null);
    const receivedOnInputRef = React.useRef<HTMLInputElement>(null);

    return (
        <div className={styles.container}>
            <Title1>Media Request</Title1>
            <div className={styles.form}>
                <Field
                    label="Status"
                    required
                    validationMessage={showValidation && !status ? "Status is required" : undefined}
                    validationState={showValidation && !status ? "error" : "none"}
                >
                    <Dropdown
                        placeholder="Select a status"
                        selectedOptions={status ? [status.toString()] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                setStatus(Number(data.optionValue));
                                setShowValidation(false);
                            }
                        }}
                        onOpenChange={(_, data) => {
                            if (!data.open) {
                                setShowValidation(true);
                            }
                        }}
                    >
                        {statusOptions.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.text}
                            </Option>
                        ))}
                    </Dropdown>
                </Field>
                <Field
                    label="Request Title"
                    required
                    validationMessage={showValidation && !requestTitle.trim() ? "Request title is required" : undefined}
                    validationState={showValidation && !requestTitle.trim() ? "error" : "none"}
                >
                    <Input
                        placeholder="Enter request title"
                        value={requestTitle}
                        onChange={(_, data) => {
                            setRequestTitle(data.value);
                            if (data.value.trim()) {
                                setShowValidation(false);
                            }
                        }}
                        onBlur={() => setShowValidation(true)}
                    />
                </Field>
                <Field
                    label="Requested By"
                    required
                    validationMessage={showValidation && !requestedBy.trim() ? "Requested by is required" : undefined}
                    validationState={showValidation && !requestedBy.trim() ? "error" : "none"}
                >
                    <Input
                        placeholder="Enter name of requester"
                        value={requestedBy}
                        onChange={(_, data) => {
                            setRequestedBy(data.value);
                            if (data.value.trim()) {
                                setShowValidation(false);
                            }
                        }}
                        onBlur={() => setShowValidation(true)}
                    />
                </Field>
                <Field
                    label="Deadline"
                    required
                    validationMessage={showValidation && !deadline ? "Deadline is required" : undefined}
                    validationState={showValidation && !deadline ? "error" : "none"}
                >
                    <div style={{ position: 'relative', width: '100%' }}>
                        <Input
                            type="text"
                            value={deadline}
                            placeholder="Select a date"
                            className={styles.dateInput}
                            readOnly
                            contentAfter={
                                <CalendarEmpty24Regular 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => dateInputRef.current?.showPicker()}
                                />
                            }
                            onBlur={() => setShowValidation(true)}
                        />
                        <input
                            ref={dateInputRef}
                            type="date"
                            className={styles.hiddenDateInput}
                            onChange={(e) => {
                                setDeadline(e.target.value);
                                setShowValidation(false);
                            }}
                        />
                    </div>
                </Field>
                <Field
                    label="Received On"
                    required
                    validationMessage={showValidation && !receivedOn ? "Received date is required" : undefined}
                    validationState={showValidation && !receivedOn ? "error" : "none"}
                >
                    <div style={{ position: 'relative', width: '100%' }}>
                        <Input
                            type="text"
                            value={receivedOn}
                            placeholder="Select a date"
                            className={styles.dateInput}
                            readOnly
                            contentAfter={
                                <CalendarEmpty24Regular 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => receivedOnInputRef.current?.showPicker()}
                                />
                            }
                            onBlur={() => setShowValidation(true)}
                        />
                        <input
                            ref={receivedOnInputRef}
                            type="date"
                            className={styles.hiddenDateInput}
                            onChange={(e) => {
                                setReceivedOn(e.target.value);
                                setShowValidation(false);
                            }}
                        />
                    </div>
                </Field>
                <Field
                    label="Request Type"
                    required
                    validationMessage={showValidation && !requestType ? "Request type is required" : undefined}
                    validationState={showValidation && !requestType ? "error" : "none"}
                >
                    <Dropdown
                        placeholder="Select a request type"
                        selectedOptions={requestType ? [requestType.toString()] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                setRequestType(Number(data.optionValue));
                                setShowValidation(false);
                            }
                        }}
                        onOpenChange={(_, data) => {
                            if (!data.open) {
                                setShowValidation(true);
                            }
                        }}
                    >
                        {requestTypeOptions.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.text}
                            </Option>
                        ))}
                    </Dropdown>
                </Field>
                <Field
                    label="Request Details"
                    required
                    validationMessage={showValidation && !requestDetails.trim() ? "Request details are required" : undefined}
                    validationState={showValidation && !requestDetails.trim() ? "error" : "none"}
                >
                    <Textarea
                        placeholder="Enter request details"
                        value={requestDetails}
                        resize="vertical"
                        style={{ minHeight: '100px' }}
                        onChange={(_, data) => {
                            setRequestDetails(data.value);
                            if (data.value.trim()) {
                                setShowValidation(false);
                            }
                        }}
                        onBlur={() => setShowValidation(true)}
                    />
                </Field>
                <Divider style={{ margin: '24px 0 16px 0' }} />
                <Title2>Ministry & Contact Information</Title2>
                <Field
                    label="Lead Ministry"
                    required
                    validationMessage={showValidation && !leadMinistry ? "Lead ministry is required" : undefined}
                    validationState={showValidation && !leadMinistry ? "error" : "none"}
                >
                    <Dropdown
                        placeholder="Select lead ministry"
                        selectedOptions={leadMinistry ? [leadMinistry] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                setLeadMinistry(data.optionValue as Ministry);
                                setShowValidation(false);
                            }
                        }}
                        onOpenChange={(_, data) => {
                            if (!data.open) {
                                setShowValidation(true);
                            }
                        }}
                    >
                        {Object.values(Ministry).map(ministry => (
                            <Option key={ministry} value={ministry}>
                                {ministry}
                            </Option>
                        ))}
                    </Dropdown>
                </Field>
                <Field
                    label="Additional Ministry"
                >
                    <Dropdown
                        placeholder="Select additional ministry"
                        selectedOptions={additionalMinistry ? [additionalMinistry] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                setAdditionalMinistry(data.optionValue as Ministry);
                            }
                        }}
                    >
                        {Object.values(Ministry).map(ministry => (
                            <Option key={ministry} value={ministry}>
                                {ministry}
                            </Option>
                        ))}
                    </Dropdown>
                </Field>
                <Field
                    label="Assigned To"
                    required
                    validationMessage={showValidation && !assignedTo.trim() ? "Assigned to is required" : undefined}
                    validationState={showValidation && !assignedTo.trim() ? "error" : "none"}
                >
                    <Input
                        placeholder="Enter name of assignee"
                        value={assignedTo}
                        onChange={(_, data) => {
                            setAssignedTo(data.value);
                            if (data.value.trim()) {
                                setShowValidation(false);
                            }
                        }}
                        onBlur={() => setShowValidation(true)}
                    />
                </Field>
                <Field
                    label="Notified Recipient(s)"
                >
                    <Input
                        placeholder="Enter recipient names"
                        value={notifiedRecipients}
                        onChange={(_, data) => {
                            setNotifiedRecipients(data.value);
                        }}
                    />
                </Field>
                <div className={styles.buttonContainer}>
                    <Button
                        appearance="secondary"
                        onClick={() => {
                            // TODO: Handle cancel
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        appearance="primary"
                        onClick={() => {
                            // TODO: Handle save
                            setShowValidation(true);
                        }}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewRequestPage;