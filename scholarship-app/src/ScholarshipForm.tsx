import React, { useState } from 'react';
import axios from 'axios';
import { ScholarshipFormData } from './types';

const ScholarshipForm: React.FC = () => {
    const [formData, setFormData] = useState<ScholarshipFormData>({
        title: '',
        description: '',
        amount: 0,
        deadline: '',
        eligibility_criteria: {},
        details: {},
        provider: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'amount' ? parseFloat(value) : value });
    };

    const handleEligibilityChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setFormData({
            ...formData,
            eligibility_criteria: { ...formData.eligibility_criteria, [key]: e.target.value },
        });
    };

    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setFormData({
            ...formData,
            details: { ...formData.details, [key]: e.target.value },
        });
    };

    const addEligibility = () => {
        const key = prompt('Enter eligibility criterion key:');
        if (key) {
            setFormData({
                ...formData,
                eligibility_criteria: { ...formData.eligibility_criteria, [key]: '' },
            });
        }
    };

    const addDetail = () => {
        const key = prompt('Enter detail key:');
        if (key) {
            setFormData({
                ...formData,
                details: { ...formData.details, [key]: '' },
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/scholarships', {
                ...formData,
                eligibility_criteria: JSON.stringify(formData.eligibility_criteria),
                details: JSON.stringify(formData.details),
            });
            console.log('Scholarship created:', response.data);
        } catch (error) {
            console.error('Error creating scholarship:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
            />
            <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                placeholder="Provider"
                required
            />
            <div>
                <h4>Eligibility Criteria</h4>
                {Object.keys(formData.eligibility_criteria).map((key) => (
                    <div key={key}>
                        <input type="text" value={key} readOnly />
                        <input
                            type="text"
                            value={formData.eligibility_criteria[key]}
                            onChange={(e) => handleEligibilityChange(e, key)}
                            placeholder="Value"
                        />
                    </div>
                ))}
                <button type="button" onClick={addEligibility}>Add Eligibility Criterion</button>
            </div>
            <div>
                <h4>Details</h4>
                {Object.keys(formData.details).map((key) => (
                    <div key={key}>
                        <input type="text" value={key} readOnly />
                        <input
                            type="text"
                            value={formData.details[key]}
                            onChange={(e) => handleDetailChange(e, key)}
                            placeholder="Value"
                        />
                    </div>
                ))}
                <button type="button" onClick={addDetail}>Add Detail</button>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ScholarshipForm;