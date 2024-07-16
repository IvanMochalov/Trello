export const Paths = {
	browserHomePage: '/trello.github.io',
	homePage: '/',
	boardPage: '/:board_id',
	boardPageRoute: (id: string) => `/${id}`,
} as const
