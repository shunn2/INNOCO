import pageApi from '@api/pageApi';
import { SvgIcon } from '@components/Common';
import CreateModal from '@components/Common/Modal';
import CreatePage from '@components/Dashboard/CreatePage';
import EditPage from '@components/Dashboard/EditPage';
import projectAtom from '@recoil/project/atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as Styled from './styled';

interface PagePros {
  pageId: string;
  pageName: string;
  main: boolean;
}

const defaultPageProps = {
  pageId: '',
  pageName: '',
  main: false,
};

const PageList = () => {
  const router = useRouter();
  const { projectId, pageId } = router.query;
  const [projectInfo, setProjectInfo] = useRecoilState(projectAtom);
  const [pageList, setPageList] = useState<PagePros[]>([]);
  const [pageMouseOver, setPageMouseOver] =
    useState<PagePros>(defaultPageProps);
  const [pageCreateOpen, setPageCreateOpen] = useState<boolean>(false);
  const [pageEditOpen, setPageEditOpen] = useState<boolean>(false);
  const getPageList = async () => {
    const data = await pageApi.getPageList(projectInfo.projectId);
    setPageList(data.value);
    console.log('pageList', data);
  };
  const handlePageCreateOpen = () => {
    setPageCreateOpen((prev) => !prev);
  };
  const routeSelectedPage = (routePageId) => {
    router.replace({
      pathname: '/editor/[projectId]/[pageId]',
      query: { projectId: projectId, pageId: routePageId },
    });
    setProjectInfo({ ...projectInfo, pageId: routePageId });
  };

  useEffect(() => {
    getPageList();
  }, [projectInfo]);

  return (
    <div>
      <Styled.CategoryTitle>
        PAGE LIST
        <span className="add_page" onClick={() => handlePageCreateOpen()}>
          +
        </span>
      </Styled.CategoryTitle>
      {pageList &&
        pageList.map((page) => (
          <Styled.PageListContainer
            key={page.pageId}
            selected={pageId === page.pageId}
            onMouseOver={() => setPageMouseOver(page)}
            // onMouseOut={() => setPageMouseOver(defaultPageProps)}
          >
            <div
              className="flex justify-center items-center"
              onClick={() => routeSelectedPage(page.pageId)}
            >
              {page.pageName}
              {page.main && (
                <div className="ml-2">
                  <SvgIcon type="main_crown" />
                </div>
              )}
            </div>
            {page.pageId === pageMouseOver.pageId ? (
              <div onClick={() => setPageEditOpen(true)}>
                <SvgIcon type="setting_icon" />
              </div>
            ) : (
              <div style={{ width: '25px' }} />
            )}
          </Styled.PageListContainer>
        ))}
      {pageCreateOpen && (
        <CreateModal isOpen={pageCreateOpen}>
          <CreatePage handleOpen={handlePageCreateOpen} />
        </CreateModal>
      )}
      {pageEditOpen && (
        <CreateModal isOpen={pageEditOpen} width="500px" height="200px">
          <EditPage
            {...pageMouseOver}
            originMain={pageList[0].pageId}
            handleOpen={() => setPageEditOpen(false)}
          />
        </CreateModal>
      )}
    </div>
  );
};

export default PageList;
