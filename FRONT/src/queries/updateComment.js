import { gql, useMutation } from '@apollo/client';

const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: Int!, $comment: String!) {
    updateComment(id: $id, comment: $comment) {
      id
      comment
    }
  }
`;

const useUpdateComment = () => {
  const [updateComment] = useMutation(UPDATE_COMMENT);

  return async (id, comment) => {
    try {
      const { data } = await updateComment({ variables: { id, comment } });
      return data.updateComment;
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };
};

export default useUpdateComment;
