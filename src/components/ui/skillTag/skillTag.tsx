'use client';
import styled from 'styled-components';
import React from 'react';
import { ISkillTagProps } from '@/src/models/skillTag.model';

// Estilos de la etiqueta SkillTag
const SkillTagContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 1rem;

    > :nth-child(2),:nth-child(4),:nth-child(6),:nth-child(8),:nth-child(10),:nth-child(12),
    :nth-child(14),:nth-child(16),:nth-child(18),:nth-child(20),:nth-child(22),:nth-child(24),
    :nth-child(26),:nth-child(28), :nth-child(30)  {
        margin-right: 2rem;
}
`;

const SkillTag = styled.p`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    min-width: 105px;
    max-width: 155px;
    text-align: center;
    margin: 5px 5px 0 0;
    padding: 5px 10px;
    border-radius: 20px;
    color: ${({ theme }) => theme.colors.textOrange};
    border: 1px solid ${({ theme }) => theme.colors.textOrange};
    font-size: 0.9rem;
`;

// Componente para mostrar la lista de skills
const SkillTagList: React.FC<ISkillTagProps> = ({ skillsArray }) => {
    return (
        <SkillTagContainer>
            {skillsArray.map((skill, index) => (
                <SkillTag key={index}>{skill}</SkillTag>
            ))}
        </SkillTagContainer>
    );
};

export default SkillTagList;
