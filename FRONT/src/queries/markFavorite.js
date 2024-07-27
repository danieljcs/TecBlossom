import { gql, useMutation } from '@apollo/client';

const MARK_FAVORITE = gql`
  mutation markFavorite($id: Int!) {
    markFavorite(id: $id) {
      id
      is_favorite
    }
  }
`;

const useMarkFavorite = () => {
  const [markFavorite] = useMutation(MARK_FAVORITE);

  return async (id) => {
    try {
      const { data } = await markFavorite({ variables: { id } });
      return data.markFavorite;
    } catch (error) {
      console.error('Error updating comment:', error);
    }
};
};

export default useMarkFavorite;
