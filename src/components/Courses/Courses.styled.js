import styled from 'styled-components';

export const CoursesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 50px;
`;

export const CoursesListItem = styled.li`
  box-shadow: rgba(24, 39, 75, 0.12) 0px 8px 18px -6px,
    rgba(24, 39, 75, 0.12) 0px 12px 42px -4px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  justify-self: center;
  flex-direction: column;
  width: 558px;
`;

export const CoursesListItemWrapper = styled.div`
  padding: 24px;
`;
