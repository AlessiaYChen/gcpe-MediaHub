using System;
using System.Collections.Generic;
using MediaHubExplore.Backend.Models;

namespace MediaHubExplore.Backend.Data
{
    public interface IOutletStore
    {
        IEnumerable<Outlet> GetAll();
        Outlet? GetById(Guid id);
        void Add(Outlet outlet);
        void Update(Outlet outlet);
        void Delete(Guid id);
    }
}