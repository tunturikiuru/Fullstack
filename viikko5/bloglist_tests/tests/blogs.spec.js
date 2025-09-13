const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('5.17: Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()
  })

  describe('5.18: Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'secret')
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('5.19: a new blog can be created', async ({ page }) => {
      await page.getByRole('button', {name: 'create new blog'}).click()
      await createBlog(page, 'testing....', 'tester', 'www....')
      await expect(page.getByText('testing.... tester')).toBeVisible()
    })

    describe('When blog has been created', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', {name: 'create new blog'}).click()
        await createBlog(page, 'testing....', 'tester', 'www....')
      })

      test('5.20: blog can be liked', async ({ page }) => {
        await page.getByRole('button', {name: 'view'}).click()
        await page.getByRole('button', {name: 'like'}).click()
        await expect(page.getByText('likes: 1')).toBeVisible()
      })

      test('5.21 & 5.22: blog can be removed (by right user)', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', {name: 'view'}).click()
        await expect(page.getByRole('button', {name: 'remove'})).toBeVisible()
        await page.getByRole('button', {name: 'remove'}).click()
        await expect(page.getByText('testing.... tester')).not.toBeVisible()
      })

      test('5.22: blog cannot be removed by wrong user', async ({ page, request }) => {
        await page.getByRole('button', {name: 'logout'}).click()
        await request.post('http://localhost:3003/api/users', {
          data: {
          name: 'New User',
          username: 'test_user',
          password: 'secret'
          }
        })

        await loginWith(page, 'test_user', 'secret')
        await expect(page.getByText('New User logged in')).toBeVisible()
        await page.getByRole('button', {name: 'view'}).click()
        await expect(page.getByRole('button', {name: 'remove'})).not.toBeVisible()
      })

    })

  })
})
