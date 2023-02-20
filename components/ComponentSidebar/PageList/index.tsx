import pageApi from '@api/pageApi';
import { SvgIcon } from '@components/Common';
import CreateModal from '@components/Common/Modal';
import CreatePage from '@components/Dashboard/CreatePage';
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

const PageList = () => {
  const router = useRouter();
  const { projectId, pageId } = router.query;
  const [projectInfo, setProjectInfo] = useRecoilState(projectAtom);
  const [pageList, setPageList] = useState<PagePros[]>([]);
  const [pageCreateOpen, setPageCreateOpen] = useState<boolean>(false);
  const getPageList = async () => {
    const data = await pageApi.getPageList(projectId);
    setPageList(data.value);
  };
  const handlePageCreateOpen = () => {
    setPageCreateOpen((prev) => !prev);
  };
  const routeSelectedPage = (routePageId) => {
    setProjectInfo({ ...projectInfo, pageId: routePageId });
    router.replace({
      pathname: '/editor/[projectId]/[pageId]',
      query: { projectId: projectId, pageId: routePageId },
    });
  };

  useEffect(() => {
    getPageList();
  }, [projectId]);

  return (
    <div>
      <Styled.CategoryTitle>
        PAGE LIST
        <span className="add_page" onClick={() => handlePageCreateOpen()}>
          +
        </span>
      </Styled.CategoryTitle>
      {pageList.map((page) => (
        <Styled.PageListContainer
          key={page.pageId}
          selected={pageId === page.pageId}
          onClick={() => routeSelectedPage(page.pageId)}
        >
          {page.pageName}
          {page.main && <SvgIcon type="main_crown" />}
        </Styled.PageListContainer>
      ))}
      {pageCreateOpen && (
        <CreateModal isOpen={pageCreateOpen}>
          <CreatePage handleOpen={handlePageCreateOpen} />
        </CreateModal>
      )}
    </div>
  );
};

export default PageList;
