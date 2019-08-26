Feature: E-Commerce functionalities

  Background: Go to shop page
    Given I am at the ecommerce shop page

  Scenario: Adding a product to the shopping cart
    When I add an "iphone X" to the shopping cart
    Then I verify the checkout button at the top shows the total items in the cart as 1

  Scenario: Verify checkout view
    When I add an "iphone X" to the shopping cart
      And I go to checkout view
    Then I verify the "iphonex" info is shown

  Scenario: Remove a product from cart
    When I add an "iphone X" to the shopping cart
      And I go to checkout view
      And I remove the "iphone X" from the cart
    Then I verify the "iphone X" info is no longer shown
