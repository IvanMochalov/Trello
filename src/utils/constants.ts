export const Paths = {
	browserHomePage: '/simple_trello',
	homePage: '/',
	boardPage: '/:board_id',
	boardPageRoute: (id: string) => `/${id}`,
} as const
